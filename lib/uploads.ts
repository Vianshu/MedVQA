import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabase/client';
import { useAuth } from './auth';

export interface Upload {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  createdAt: string;
}

interface UploadsState {
  uploads: Upload[];
  addUpload: (file: File) => Promise<void>;
  fetchUploads: () => Promise<void>;
}

export const useUploads = create<UploadsState>()(
  persist(
    (set) => ({
      uploads: [],
      fetchUploads: async () => {
        const { data, error } = await supabase
          .from('uploads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          set({
            uploads: data.map((upload) => ({
              id: upload.id,
              fileName: upload.metadata.fileName || 'Untitled',
              fileType: upload.file_type,
              fileUrl: upload.file_url,
              createdAt: upload.created_at,
            })),
          });
        }
      },
      addUpload: async (file: File) => {
        const user = useAuth.getState().user;
        if (!user) throw new Error('Not authenticated');

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `uploads/${user.uid}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('files')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('files')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('uploads')
          .insert([
            {
              user_id: user.uid,
              file_url: publicUrl,
              file_type: file.type,
              metadata: {
                fileName: file.name,
                size: file.size,
              },
            },
          ]);

        if (dbError) {
          throw new Error(dbError.message);
        }

        // Refresh uploads list
        await useUploads.getState().fetchUploads();
      },
    }),
    {
      name: 'uploads-storage',
    }
  )
);