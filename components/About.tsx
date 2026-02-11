'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getProfileData } from '@/lib/profile';
import { getWorkExperiences, WorkExperience } from '@/lib/experience';
import {
  Code2,
  Smartphone,
  Globe,
  Zap,
  Laptop,
  Apple,        // for iOS programming
  Flame,        // for passion/persistence
  MessageCircle, // for communication
  Briefcase,
  Calendar,
  Building2
} from 'lucide-react';

const About = () => {
  const [bio, setBio] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const profileData = await getProfileData();
      if (profileData?.bio) {
        setBio(profileData.bio);
      }
      
      const workData = await getWorkExperiences();
      setExperiences(workData);
    };
    loadData();
  }, []);

  const highlights = [

    {
      icon: Laptop,
      title: 'Desktop',
      description: 'Creating responsive applications that work perfectly on all devices.',
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'Expert in modern web frameworks and cutting-edge technologies.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Creating responsive applications that work perfectly on all devices.',
    },
    {
      icon: Apple,
      title: 'Apple Development',
      description: 'Building high-quality, native iOS / macOS apps with a focus on performance and design.',
    },
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and user experience.',
    },
    {
      icon: Flame,
      title: 'Passion & Persistence',
      description: 'Driven to solve problems and deliver results, even when challenges arise.',
    },
    {
      icon: MessageCircle,
      title: 'Communication',
      description: 'Clear, open, and effective communication for strong team collaboration.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <div className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              {bio ? (
                <div className="whitespace-pre-line">{bio}</div>
              ) : (
                <div className="space-y-4">
                  <p>
                    I’m a Microsoft Certified Engineer and a seasoned mobile, web, and desktop application
                    developer with a strong background in Microsoft development technologies. From building
                    enterprise-grade .NET and Azure-based solutions to crafting cross-platform apps, I focus
                    on delivering secure, scalable, and high-performing systems.
                  </p>
                  <p>
                    My expertise spans modern JavaScript frameworks, cross-platform mobile development,
                    and cloud architecture—blending Microsoft’s robust ecosystem with open-source tools to
                    create innovative solutions that work seamlessly across devices.
                  </p>
                  <p>
                    When I’m not coding, I’m exploring new technologies, contributing to open-source projects,
                    or mentoring other developers in Microsoft-based and cross-platform development practices.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-24">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 flex items-center justify-center gap-3">
                <span className="bg-primary/10 p-3 rounded-xl shadow-sm">
                  <Briefcase className="w-6 h-6 text-primary" />
                </span>
                My Journey
              </h3>
              
              {experiences.length > 0 ? (
                <div className="relative">
                  {/* Central Road Line - Hidden on mobile, visible on desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 rounded-full" />

                  {/* Mobile Line - Left aligned */}
                  <div className="md:hidden absolute left-8 h-full w-1 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 rounded-full" />

                  <div className="space-y-12 md:space-y-24">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className={`relative flex flex-col md:flex-row items-center md:justify-between gap-8 group`}>
                        
                        {/* Left Side Content (for even items on desktop) */}
                        <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${
                          index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-last md:text-left md:pl-12'
                        }`}>
                          <div className={`relative p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
                            index % 2 === 0 ? 'md:hover:-translate-x-1' : 'md:hover:translate-x-1'
                          }`}>
                            {/* Connector Curve for Desktop */}
                            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-12 bg-primary/30 ${
                              index % 2 === 0 ? '-right-12' : '-left-12'
                            }`} />
                            
                            {/* Mobile Connector */}
                            <div className="md:hidden absolute top-8 -left-12 w-12 h-0.5 bg-primary/30" />

                            <h4 className="font-bold text-xl text-foreground mb-1 flex items-center gap-2 md:inline-flex">
                              {exp.role}
                            </h4>
                            
                            <div className={`flex flex-wrap gap-2 mb-3 text-sm text-muted-foreground ${
                              index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                            }`}>
                              <span className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-md">
                                <Building2 className="w-3 h-3" />
                                {exp.company}
                              </span>
                              <span className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </span>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                              {exp.description}
                            </p>
                          </div>
                        </div>

                        {/* Center Marker / Road Stop */}
                        <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-primary shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                          </div>
                        </div>

                        {/* Spacer for the other side on desktop */}
                        <div className="hidden md:block md:w-[45%]" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 border-2 border-dashed rounded-xl bg-muted/30 text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-lg font-medium">Work history is being updated...</p>
                  <p className="text-sm">Check back soon to see my professional journey.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Technical Highlights</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item) => (
              <Card key={item.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
