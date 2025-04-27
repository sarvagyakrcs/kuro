export const projectConfig = {
  name: 'Kuro.ai',
  mainAppUrl: 'https://kuro-gamma.vercel.app', // Replace with actual app URL
  seo: {
    title: {
      template: '%s - Kuro.ai',
      default: 'Kuro.ai - AI-Powered Development Studio',
    },
    description: 'We are a development studio working at the intersection of AI and technology.',
  },
  hero: {
    title: 'AI-Powered Development Studio',
    description: 'We are a development studio working at the intersection of AI and technology, leveraging cutting-edge artificial intelligence to deliver innovative solutions.',
  },
  services: {
    title: 'We help you identify, explore and respond to new opportunities.',
    description: 'Leveraging AI to transform your ideas into reality.',
    items: [
      {
        title: 'AI Development',
        description: 'We specialize in building custom AI solutions that solve real business problems, from machine learning models to natural language processing systems.',
      },
      {
        title: 'Application Development',
        description: 'Our team builds modern, scalable applications using the latest technologies and best practices in software development.',
      },
      {
        title: 'AI Integration',
        description: 'We help businesses integrate AI capabilities into their existing systems and workflows for improved efficiency and automation.',
      },
      {
        title: 'Custom Solutions',
        description: 'We develop tailored AI solutions that address your specific business needs and challenges.',
      },
    ],
  },
  caseStudies: {
    title: 'Harnessing AI for a brighter future',
    description: 'We believe artificial intelligence is the key to solving the world\'s greatest challenges. Our case studies showcase how we\'ve helped businesses transform through AI.',
  },
  contact: {
    title: 'Let\'s work together',
    description: 'We\'d love to hear about your project. Contact us to start the conversation.',
    email: 'hello@kuro.ai',
  },
  social: {
    twitter: 'https://twitter.com/kuroai',
    linkedin: 'https://linkedin.com/company/kuroai',
    github: 'https://github.com/kuroai',
  },
} as const; 