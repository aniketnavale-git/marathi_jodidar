export interface Profile {
  id: string;
  name: string;
  age: number;
  height: string;
  caste: string;
  education: string;
  profession: string;
  location: string;
  district?: string;
  bio: string;
  imageUrl: string;
}

export const dummyProfiles: Profile[] = [
  {
    id: '1',
    name: 'Anjali Deshmukh',
    age: 26,
    height: '5\'4"',
    caste: 'Maratha',
    education: 'BE Computer',
    profession: 'Software Engineer',
    location: 'Pune',
    district: 'Pune',
    bio: 'Looking for a well-educated and understanding partner. I enjoy reading and traveling.',
    imageUrl: 'https://images.unsplash.com/photo-1544626154-159cf0591244?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '2',
    name: 'Rahul Patil',
    age: 29,
    height: '5\'10"',
    caste: 'Maratha',
    education: 'MBA',
    profession: 'Marketing Manager',
    location: 'Mumbai',
    district: 'Mumbai Suburban',
    bio: 'Family-oriented person with a modern outlook. Love to cook and play cricket on weekends.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    name: 'Sneha Kulkarni',
    age: 25,
    height: '5\'2"',
    caste: 'Brahmin',
    education: 'M.Com',
    profession: 'Banker',
    location: 'Nashik',
    district: 'Nashik',
    bio: 'Simple and caring girl. Enjoys classical music and spending time with family.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '4',
    name: 'Aditya Joshi',
    age: 30,
    height: '5\'11"',
    caste: 'Brahmin',
    education: 'MS',
    profession: 'Data Scientist',
    location: 'Pune',
    district: 'Pune',
    bio: 'Tech enthusiast who loves hiking. Looking for someone with similar interests.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '5',
    name: 'Pooja Pawar',
    age: 27,
    height: '5\'5"',
    caste: 'Maratha',
    education: 'B.Arch',
    profession: 'Architect',
    location: 'Nagpur',
    district: 'Nagpur',
    bio: 'Creative and independent. Passsionate about design and photography.',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  }
];
