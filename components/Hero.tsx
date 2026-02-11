'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { getOptimizedImageUrl } from '@/lib/image-utils';

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  // Contact information - Update these with your actual details
  const contactInfo = {
    email: 'happyleonardo77@gmail.com',
    github: 'https://github.com/ghleoperez',
    linkedin: 'https://www.linkedin.com/in/leonardo-perez-352300374',
    resumeUrl: '/resume.pdf', // Place your resume in the public folder
  };

  const handleGetInTouch = () => {
    const subject = encodeURIComponent('Hello! I would like to get in touch');
    const body = encodeURIComponent('Hi John,\n\nI visited your portfolio and would like to discuss...\n\nBest regards,');
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    window.open(mailtoUrl, '_blank');
    toast.success('Opening email client...');
  };

  const handleDownloadResume = () => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = contactInfo.resumeUrl;
      link.download = 'Leo_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Resume download started!');
    } catch (error) {
      toast.error('Resume not available. Please contact me directly.');
      console.error('Resume download error:', error);
    }
  };

  const handleSocialClick = (url: string, platform: string) => {
    if (url === '#') {
      toast.info(`${platform} link will be available soon!`);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    const mailtoUrl = `mailto:${contactInfo.email}`;
    window.open(mailtoUrl, '_blank');
    toast.success('Opening email client...');
  };

  return (
    <section id="home" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={getOptimizedImageUrl("/images/profile.jpg")}
                  alt="Profile Photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-4xl font-bold text-primary-foreground">LP</span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Leonardo Perez
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Full-Stack Developer
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafting beautiful, functional applications with modern technologies.
              Specializing in Mobile, Web, Desktop App development.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleGetInTouch}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleDownloadResume}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => handleSocialClick(contactInfo.github, 'GitHub')}
              className="p-3 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleSocialClick(contactInfo.linkedin, 'LinkedIn')}
              className="p-3 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </button>
            <button
              onClick={handleEmailClick}
              className="p-3 rounded-full border hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default Hero;