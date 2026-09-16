CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 100),
  last_name text NOT NULL CHECK (char_length(last_name) BETWEEN 1 AND 100),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 1 AND 160),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  property_address text CHECK (property_address IS NULL OR char_length(property_address) <= 300),
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 100),
  zip_code text NOT NULL CHECK (char_length(zip_code) BETWEEN 5 AND 10),
  facility_type text NOT NULL CHECK (facility_type IN ('Office','Professional Office','Lobby / Common Area','Daycare','Commercial Facility','Move-In / Move-Out','Other')),
  square_footage text CHECK (square_footage IS NULL OR char_length(square_footage) <= 50),
  frequency text NOT NULL CHECK (frequency IN ('One-Time Cleaning','Daily','Multiple Times Per Week','Weekly','Biweekly','Monthly','Not Sure / Need Recommendation')),
  desired_start date,
  preferred_time text CHECK (preferred_time IS NULL OR preferred_time IN ('Business Hours','After Business Hours','Either / Flexible')),
  cleaning_areas text[] NOT NULL DEFAULT '{}',
  cleaning_needs text CHECK (cleaning_needs IS NULL OR char_length(cleaning_needs) <= 3000),
  attachment_path text CHECK (attachment_path IS NULL OR char_length(attachment_path) <= 500),
  contact_consent boolean NOT NULL CHECK (contact_consent = true),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit quote requests" ON public.quote_requests FOR INSERT TO anon, authenticated WITH CHECK (contact_consent = true);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  business_name text CHECK (business_name IS NULL OR char_length(business_name) <= 160),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);