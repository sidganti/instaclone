import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/supabase";

import { useState } from "react";

export const useProfiles = () => {
  const supabase = createClient();

  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [profiles, setProfiles] = useState<Tables<"profiles">[]>([]);
  const [authenticatedProfile, setAuthenticatedProfile] = useState<Tables<"profiles">>();

  const getProfiles = async () => {
    setLoadingProfiles(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*");

    if (data) {
      setProfiles(data);
    }

    setLoadingProfiles(false);
  }

  const getAuthenticatedProfile = async (id: string) => {
    setLoadingProfiles(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single();

    if (data) {
      setAuthenticatedProfile(data);
    }

    setLoadingProfiles(false);
  }

  return {
    loadingProfiles,
    profiles,
    getProfiles,
    authenticatedProfile,
    getAuthenticatedProfile
  }
}
