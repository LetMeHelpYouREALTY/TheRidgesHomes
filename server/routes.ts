import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, valuationRequestSchema } from "@shared/schema";
import followUpBossService from "./services/followUpBoss";
import axios from 'axios';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Contact form submission endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      // Validate the contact form data
      const validatedData = contactSchema.parse(req.body);
      
      // Store contact form data in our local storage
      const contactRequest = await storage.createContactSubmission(validatedData);
      
      // Send the contact data to Follow Up Boss CRM
      let followUpBossResponse = null;
      let followUpBossError = null;
      
      try {
        // Check if contact exists first
        const existingContact = await followUpBossService.checkExistingContact(validatedData.email);
        
        // If not found or empty results, create new contact
        if (!existingContact || existingContact.people.length === 0) {
          // Transform the data to have the expected format for Follow Up Boss
          // This handles the different field names in client and server schemas
          const contactData = {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone,
            interest: validatedData.interest || null,
            message: validatedData.message || null,
            consent: validatedData.consent || false,
            consentGiven: validatedData.consent || false // Add this for compatibility with client type
          };
          
          followUpBossResponse = await followUpBossService.createContact(contactData);
          console.log('Contact created in Follow Up Boss:', followUpBossResponse);
        } else {
          console.log('Contact already exists in Follow Up Boss');
        }
      } catch (crmError) {
        console.error('Error with Follow Up Boss CRM:', crmError);
        followUpBossError = crmError instanceof Error ? crmError.message : 'Unknown CRM error';
        // We don't want to fail the whole request if CRM integration fails
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Contact request received successfully',
        id: contactRequest.id,
        crmStatus: followUpBossError ? 'error' : 'success',
        crmMessage: followUpBossError || 'Contact data sent to CRM'
      });
    } catch (error) {
      console.error('Error processing contact request:', error);
      res.status(400).json({ 
        success: false, 
        message: 'Invalid form data', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Home valuation request endpoint
  app.post('/api/valuation', async (req, res) => {
    try {
      // Validate the valuation request data
      const validatedData = valuationRequestSchema.parse(req.body);
      
      // Store valuation request in our local storage
      const valuationRequest = await storage.createValuationRequest(validatedData);
      
      // Send the contact data to Follow Up Boss CRM
      let followUpBossResponse = null;
      let followUpBossError = null;
      
      try {
        // Check if contact exists first
        const existingContact = await followUpBossService.checkExistingContact(validatedData.email);
        
        // If not found or empty results, create new contact
        if (!existingContact || existingContact.people.length === 0) {
          // Transform the data to have the expected format for Follow Up Boss
          const contactData = {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone,
            interest: 'Home Valuation', // Tag this lead specifically for valuation
            message: `Property Address: ${validatedData.address}, ${validatedData.city}, ${validatedData.state} ${validatedData.zipCode}${validatedData.timeframe ? ` | Timeframe: ${validatedData.timeframe}` : ''}`,
            consentGiven: true // Assume consent was given if they submitted a valuation
          };
          
          followUpBossResponse = await followUpBossService.createContact(contactData);
          console.log('Valuation contact created in Follow Up Boss:', followUpBossResponse);
        } else {
          console.log('Contact already exists in Follow Up Boss');
        }
      } catch (crmError) {
        console.error('Error with Follow Up Boss CRM:', crmError);
        followUpBossError = crmError instanceof Error ? crmError.message : 'Unknown CRM error';
        // We don't want to fail the whole request if CRM integration fails
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Valuation request received successfully',
        id: valuationRequest.id,
        crmStatus: followUpBossError ? 'error' : 'success',
        crmMessage: followUpBossError || 'Valuation request sent to CRM'
      });
    } catch (error) {
      console.error('Error processing valuation request:', error);
      res.status(400).json({ 
        success: false, 
        message: 'Invalid valuation form data', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
