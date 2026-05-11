// js/config.js — Shared Supabase client & config
const SUPABASE_URL      = 'https://klvqcyklmdcnlursflqv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsdnFjeWtsbWRjbmx1cnNmbHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzEwMjAsImV4cCI6MjA5NDAwNzAyMH0.BUCJIERybyQWwHO2D1wUuZhHp1b_c5qnnagYOzLQK_g';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ADMIN_USER_ID = 'b9f8aa9d-26ce-46d1-a3e5-c67c8c52929f';

const SITE_URL       = window.location.origin;
const DASHBOARD_URL  = SITE_URL + '/dashboard.html';
const PLATFORMS_URL  = SITE_URL + '/connect-platforms.html';
const LOGIN_URL      = SITE_URL + '/index.html';
const ONBOARDING_URL = SITE_URL + '/onboarding.html';