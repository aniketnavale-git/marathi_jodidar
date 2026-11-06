import React, { createContext, useContext, useState, ReactNode } from 'react';
import { dummyProfiles, Profile } from '../data/dummyData';

interface InterestsContextType {
  favorites: Set<string>;
  sentInterests: Set<string>;
  toggleFavorite: (id: string) => void;
  toggleInterest: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isInterested: (id: string) => boolean;
  getFavoritedProfiles: () => Profile[];
  getSentInterestProfiles: () => Profile[];
}

const InterestsContext = createContext<InterestsContextType | undefined>(undefined);

export const InterestsProvider = ({ children }: { children: ReactNode }) => {
  // Pre-seed with sample interactions for a live experience
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['2']));
  const [sentInterests, setSentInterests] = useState<Set<string>>(new Set(['1']));

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleInterest = (id: string) => {
    setSentInterests(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.has(id);
  const isInterested = (id: string) => sentInterests.has(id);

  const getFavoritedProfiles = () => {
    return dummyProfiles.filter(p => favorites.has(p.id));
  };

  const getSentInterestProfiles = () => {
    return dummyProfiles.filter(p => sentInterests.has(p.id));
  };

  return (
    <InterestsContext.Provider
      value={{
        favorites,
        sentInterests,
        toggleFavorite,
        toggleInterest,
        isFavorite,
        isInterested,
        getFavoritedProfiles,
        getSentInterestProfiles,
      }}
    >
      {children}
    </InterestsContext.Provider>
  );
};

export const useInterests = () => {
  const context = useContext(InterestsContext);
  if (!context) {
    throw new Error('useInterests must be used within an InterestsProvider');
  }
  return context;
};

