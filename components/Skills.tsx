'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vue.js', 'Angular', 'HTML5', 'CSS3'],
    },
    {
      title: 'Backend Development',
      skills: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs'],
    },
    {
      title: 'Mobile Development',
      skills: ['Swift', 'Java', 'Kotlin', 'React Native', 'Flutter', 'Ionic Framework', 'Xamarin/.NET MAUI', 'Capacitor / Cordova', 'iOS', 'Android', 'Expo', 'Native Modules'],
    },
    {
      title: 'DevOps & Tools',
      skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes', 'Linux', 'Nginx', 'Monitoring'],
    },
    {
      title: 'Third Party Integration',
      skills: ['Firebase', 'Supabase', 'Parse', 'OneSignal / Twillio / SignalR', 'Paypal / Stripe / etc']
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern applications across all platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;