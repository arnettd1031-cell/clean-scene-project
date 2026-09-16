CREATE POLICY "Visitors can upload quote attachments"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'quote-attachments' AND (storage.foldername(name))[1] = 'incoming');

CREATE POLICY "Backend can manage quote attachments"
ON storage.objects FOR ALL TO service_role
USING (bucket_id = 'quote-attachments')
WITH CHECK (bucket_id = 'quote-attachments');