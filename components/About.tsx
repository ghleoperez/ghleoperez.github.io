'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Code2,
  Smartphone,
  Globe,
  Zap,
  Laptop,
  Apple,        // for iOS programming
  Flame,        // for passion/persistence
  MessageCircle // for communication
} from 'lucide-react';

const About = () => {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate developer with 20 years of experience building exceptional digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-6">
                I’m a Microsoft Certified Engineer and a seasoned mobile, web, and desktop application
                developer with a strong background in Microsoft development technologies. From building
                enterprise-grade .NET and Azure-based solutions to crafting cross-platform apps, I focus
                on delivering secure, scalable, and high-performing systems.
              </p>
              <p className="text-muted-foreground mb-6">
                My expertise spans modern JavaScript frameworks, cross-platform mobile development,
                and cloud architecture—blending Microsoft’s robust ecosystem with open-source tools to
                create innovative solutions that work seamlessly across devices.
              </p>
              <p className="text-muted-foreground">
                When I’m not coding, I’m exploring new technologies, contributing to open-source projects,
                or mentoring other developers in Microsoft-based and cross-platform development practices.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                {/* <Code2 className="h-24 w-24 text-primary/40" />
                 */}
              </div>
            </div>
          </div>

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
    </section>
  );
};

export default About;
