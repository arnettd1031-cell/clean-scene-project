import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const clean = z.string().trim();

const quoteSchema = z.object({
  first_name: clean.min(1).max(100),
  last_name: clean.min(1).max(100),
  business_name: clean.min(1).max(160),
  email: clean.email().max(255),
  phone: clean.regex(/^[+()\-\.\s\d]{7,30}$/),
  property_address: clean.max(300).optional().default(""),
  city: clean.min(1).max(100),
  zip_code: clean.regex(/^\d{5}(?:-\d{4})?$/),
  facility_type: z.enum(["Office", "Professional Office", "Lobby / Common Area", "Daycare", "Commercial Facility", "Move-In / Move-Out", "Other"]),
  square_footage: clean.max(50).optional().default(""),
  frequency: z.enum(["One-Time Cleaning", "Daily", "Multiple Times Per Week", "Weekly", "Biweekly", "Monthly", "Not Sure / Need Recommendation"]),
  desired_start: clean.optional().default(""),
  preferred_time: z.enum(["Business Hours", "After Business Hours", "Either / Flexible"]).optional(),
  cleaning_areas: z.array(clean.max(80)).max(10),
  cleaning_needs: clean.max(3000).optional().default(""),
  attachment_path: clean.max(500).optional().default(""),
  contact_consent: z.literal(true),
  website: z.string().max(0),
});

const contactSchema = z.object({
  name: clean.min(1).max(120),
  business_name: clean.max(160).optional().default(""),
  email: clean.email().max(255),
  phone: clean.regex(/^[+()\-\.\s\d]{7,30}$/).or(z.literal("")),
  message: clean.min(1).max(3000),
  website: z.string().max(0),
});

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((input) => quoteSchema.parse(input))
  .handler(async ({ data }) => {
    const { website: _website, ...payload } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quote_requests").insert({
      ...payload,
      property_address: payload.property_address || null,
      square_footage: payload.square_footage || null,
      desired_start: payload.desired_start || null,
      preferred_time: payload.preferred_time ?? null,
      cleaning_needs: payload.cleaning_needs || null,
      attachment_path: payload.attachment_path || null,
    });
    if (error) throw new Error("We couldn't send your request. Please try again.");
    return { success: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { website: _website, ...payload } = data;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      ...payload,
      business_name: payload.business_name || null,
      phone: payload.phone || null,
    });
    if (error) throw new Error("We couldn't send your message. Please try again.");
    return { success: true };
  });