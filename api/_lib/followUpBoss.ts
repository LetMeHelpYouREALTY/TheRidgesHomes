import axios from 'axios';

interface GenericContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest?: string | null;
  message?: string | null;
  consent?: boolean;
  consentGiven?: boolean;
}

const FOLLOW_UP_BOSS_API_URL = 'https://api.followupboss.com/v1';

interface FollowUpBossPersonData {
  firstName: string;
  lastName: string;
  emails: { value: string; type: string }[];
  phones: { value: string; type: string }[];
  source: string;
  tags?: string[];
  notes?: string;
}

export function isFollowUpBossConfigured(): boolean {
  return Boolean(process.env.FOLLOW_UP_BOSS_API_KEY?.trim());
}

function getApiKey(): string {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Follow Up Boss API Key is not set');
  }
  return apiKey;
}

export async function createContact(formData: GenericContactData) {
  const API_KEY = getApiKey();

  const personData: FollowUpBossPersonData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    emails: [{ value: formData.email, type: 'primary' }],
    phones: [{ value: formData.phone, type: 'mobile' }],
    source: 'Website Contact Form',
    tags: formData.interest ? [formData.interest] : ['Website Inquiry'],
    notes:
      formData.message ||
      (formData.interest ? `Interest: ${formData.interest}` : 'Website inquiry'),
  };

  const auth = {
    username: API_KEY,
    password: '',
  };

  const response = await axios.post(`${FOLLOW_UP_BOSS_API_URL}/people`, personData, {
    auth,
  });

  return response.data;
}

export async function checkExistingContact(email: string) {
  const API_KEY = getApiKey();

  const auth = {
    username: API_KEY,
    password: '',
  };

  const response = await axios.get(
    `${FOLLOW_UP_BOSS_API_URL}/people/search?email=${encodeURIComponent(email)}`,
    { auth },
  );

  return response.data;
}
