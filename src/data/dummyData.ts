export interface Profile {
  id: string;
  name: string;
  marathiName?: string;
  age: number;
  height: string;
  caste: string;
  subcaste?: string;
  education: string;
  profession: string;
  company?: string;
  location: string;
  city?: string;
  district?: string;
  income?: string;
  bio: string;
  imageUrl: string;
  isVerified?: boolean;
  rashi?: string;
  manglik?: string;
}

export const dummyProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sneha Sawant',
    marathiName: 'स्नेहा सावंत',
    age: 25,
    height: '5\'4"',
    caste: 'मराठा',
    subcaste: '96 कुळी मराठा',
    education: 'B.E. Computer',
    profession: 'Software Engineer',
    company: 'TCS Pune',
    location: 'पुणे, महाराष्ट्र',
    city: 'पुणे',
    district: 'Pune',
    income: '12 लाख / वर्ष',
    bio: 'साधी, सकारात्मक आणि कुटुंबप्रिय. करिअरसोबत चांगले संस्कार आणि मूल्यांना महत्त्व देणारी. सुसंस्कृत कुटुंबातील जोडीदाराचा शोध आहे.',
    imageUrl: 'https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a?w=800&q=80',
    isVerified: true,
    rashi: 'कर्क रास',
    manglik: 'नाही (Non-Manglik)',
  },
  {
    id: '2',
    name: 'Pooja Kulkarni',
    marathiName: 'पूजा कुलकर्णी',
    age: 27,
    height: '5\'2"',
    caste: 'ब्राह्मण',
    subcaste: 'देशस्थ ऋग्वेदी',
    education: 'M.Com, CA Inter',
    profession: 'Finance Analyst',
    company: 'HDFC Bank',
    location: 'नाशिक, महाराष्ट्र',
    city: 'नाशिक',
    district: 'Nashik',
    income: '9.5 लाख / वर्ष',
    bio: 'शांत व समजूतदार स्वभाव. वाचन, संगीत आणि प्रवासाची आवड. संस्कारी व सुशिक्षित कुटुंबातील वर अपेक्षित.',
    imageUrl: 'https://images.unsplash.com/photo-1610043896564-9a00ce508e7b?w=800&q=80',
    isVerified: true,
    rashi: 'तूळ रास',
    manglik: 'नाही (Non-Manglik)',
  },
  {
    id: '3',
    name: 'Anjali Deshmukh',
    marathiName: 'अंजली देशमुख',
    age: 26,
    height: '5\'5"',
    caste: 'मराठा',
    subcaste: 'देशमुख मराठा',
    education: 'MBBS, DGO',
    profession: 'Medical Practitioner (Doctor)',
    company: 'Civil Hospital',
    location: 'मुंबई, महाराष्ट्र',
    city: 'मुंबई',
    district: 'Mumbai',
    income: '18 लाख / वर्ष',
    bio: 'वैद्यकीय क्षेत्रात कार्यरत. जीवनाकडे सकारात्मक दृष्टिकोन आणि कुटुंबाचा आदर करणारी. डॉक्टर किंवा इंजिनिअर जोडीदाराची अपेक्षा.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    isVerified: true,
    rashi: 'सिंह रास',
    manglik: 'नाही',
  },
  {
    id: '4',
    name: 'Rahul Patil',
    marathiName: 'राहुल पाटील',
    age: 29,
    height: '5\'10"',
    caste: 'मराठा',
    subcaste: '96 कुळी',
    education: 'MBA Marketing',
    profession: 'Senior Product Manager',
    company: 'Tech Solutions Mumbai',
    location: 'मुंबई, महाराष्ट्र',
    city: 'मुंबई',
    district: 'Mumbai Suburban',
    income: '22 लाख / वर्ष',
    bio: 'मॉडर्न विचार आणि पारंपरिक मूल्यांचा मेळ. फिटनेस आणि ट्रेकिंगची आवड. सुशिक्षित आणि समजूतदार जोडीदाराचा शोध.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    isVerified: true,
    rashi: 'वृषभ रास',
    manglik: 'सौम्य मंगळ',
  },
  {
    id: '5',
    name: 'Priyanka Shinde',
    marathiName: 'प्रियंका शिंदे',
    age: 26,
    height: '5\'3"',
    caste: 'कुणबी',
    subcaste: 'कुणबी मराठा',
    education: 'M.Sc. Biotechnology',
    profession: 'Research Associate',
    company: 'Serum Institute',
    location: 'पुणे, महाराष्ट्र',
    city: 'पुणे',
    district: 'Pune',
    income: '8 लाख / वर्ष',
    bio: 'विज्ञान आणि संशोधनात रुची. निसर्गप्रेमी आणि घरकामाची उत्तम आवड. मनमिळावू स्वभावाचा जोडीदार हवा आहे.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    isVerified: false,
    rashi: 'धनु रास',
    manglik: 'नाही',
  },
  {
    id: '6',
    name: 'Aditya Joshi',
    marathiName: 'आदित्य जोशी',
    age: 30,
    height: '5\'11"',
    caste: 'ब्राह्मण',
    subcaste: 'कोकणस्थ ब्राह्मण',
    education: 'M.Tech (IIT Bombay)',
    profession: 'Data Science Lead',
    company: 'Amazon Pune',
    location: 'पुणे, महाराष्ट्र',
    city: 'पुणे',
    district: 'Pune',
    income: '28 लाख / वर्ष',
    bio: 'टेक्नॉलॉजी, शास्त्रीय संगीत आणि फोटोग्राफीची आवड. स्पष्टवक्ता आणि सहकार्यशील स्वभाव. समविचारी जोडीदार अपेक्षित.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    isVerified: true,
    rashi: 'मेष रास',
    manglik: 'नाही',
  }
];

