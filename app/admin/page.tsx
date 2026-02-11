'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Github, ExternalLink, Home, X } from 'lucide-react';
import Link from 'next/link';
import { getPortfolioItems, savePortfolioItem, updatePortfolioItem, deletePortfolioItem, PortfolioItem } from '@/lib/portfolio';
import { getProfileData, saveProfileData, ProfileData } from '@/lib/profile';
import {
  getWorkExperiences,
  saveWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  WorkExperience
} from '@/lib/experience';
import { toast } from 'sonner';
import ImageUrlInput from '@/components/ImageUrlInput';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getOptimizedImageUrl } from '@/lib/image-utils';

const AdminPage = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({ userLogo: '', bio: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    type: 'web' as 'web' | 'mobile',
    githubUrl: '',
    liveUrl: '',
  });

  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const [experienceFormData, setExperienceFormData] = useState({
    company: '',
    role: '',
    period: '',
    description: '',
  });

  useEffect(() => {
    loadProjects();
    loadProfile();
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const items = await getWorkExperiences();
      setExperiences(items);
    } catch (error) {
      console.error('Error loading experiences:', error);
      toast.error('Failed to load work history');
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExperience) {
        await updateWorkExperience(editingExperience.id, experienceFormData);
        toast.success('Experience updated successfully!');
      } else {
        await saveWorkExperience(experienceFormData);
        toast.success('Experience added successfully!');
      }
      await loadExperiences();
      setIsExperienceDialogOpen(false);
      resetExperienceForm();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    }
  };

  const handleEditExperience = (experience: WorkExperience) => {
    setEditingExperience(experience);
    setExperienceFormData({
      company: experience.company,
      role: experience.role,
      period: experience.period,
      description: experience.description,
    });
    setIsExperienceDialogOpen(true);
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteWorkExperience(id);
        toast.success('Experience deleted successfully');
        await loadExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        toast.error('Failed to delete experience');
      }
    }
  };

  const resetExperienceForm = () => {
    setEditingExperience(null);
    setExperienceFormData({
      company: '',
      role: '',
      period: '',
      description: '',
    });
  };

  const loadProfile = async () => {
    try {
      const data = await getProfileData();
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile settings');
    }
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveProfileData(profileData);
      toast.success('Profile settings updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile settings');
    }
  };

  // Update the loadProjects function
  const loadProjects = async () => {
    try {
      const items = await getPortfolioItems();
      setProjects(items);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    }
  };

  // Update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);

      if (editingProject) {
        await updatePortfolioItem(editingProject.id, {
          ...formData,
          technologies: techArray,
        });
        toast.success('Project updated successfully!');
      } else {
        await savePortfolioItem({
          ...formData,
          technologies: techArray,
        });
        toast.success('Project added successfully!');
      }

      await loadProjects();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  // Update delete function
  const handleDelete = async (id: string) => {
    try {
      await deletePortfolioItem(id);
      await loadProjects();
      toast.success('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Add the missing handleEdit function
  const handleEdit = (project: PortfolioItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: project.technologies.join(', '),
      type: project.type,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
    });
    setIsDialogOpen(true);
  };

  // Add the missing resetForm function
  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      type: 'web',
      githubUrl: '',
      liveUrl: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Portfolio Admin</h1>
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-[600px]">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Work History</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Manage Projects</h2>
            <p className="text-muted-foreground">Add, edit, or remove projects from your portfolio</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select value={formData.type} onValueChange={(value: 'web' | 'mobile') => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Application</SelectItem>
                        <SelectItem value="mobile">Mobile Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {/* Replace the image URL input with ImageUrlInput component */}
                <ImageUrlInput
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Project Image URL"
                />

                <div>
                  <Label htmlFor="technologies">Technologies *</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL (comma separated)"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://your-app.com"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first project to the portfolio
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="group">
                <div className="aspect-video relative overflow-hidden bg-muted rounded-t-lg">
                  {project.image ? (
                    <Image src={getOptimizedImageUrl(project.image)} alt={project.title} className="w-full h-full object-cover" width={500} height={300} unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <Badge variant={project.type === 'mobile' ? 'default' : 'secondary'}>
                      {project.type}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
          </TabsContent>

          <TabsContent value="experience">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Work History</h2>
                <p className="text-muted-foreground">Manage your work experience timeline</p>
              </div>

              <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetExperienceForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                    </DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleExperienceSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={experienceFormData.company}
                          onChange={(e) => setExperienceFormData({ ...experienceFormData, company: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role *</Label>
                        <Input
                          id="role"
                          value={experienceFormData.role}
                          onChange={(e) => setExperienceFormData({ ...experienceFormData, role: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="period">Period *</Label>
                      <Input
                        id="period"
                        value={experienceFormData.period}
                        onChange={(e) => setExperienceFormData({ ...experienceFormData, period: e.target.value })}
                        placeholder="e.g. Jan 2020 - Present"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Summary *</Label>
                      <Textarea
                        id="description"
                        value={experienceFormData.description}
                        onChange={(e) => setExperienceFormData({ ...experienceFormData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsExperienceDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingExperience ? 'Update Experience' : 'Add Experience'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {experiences.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">No work history yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your professional experience to show your journey
                  </p>
                  <Button onClick={() => setIsExperienceDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <Card key={experience.id}>
                    <CardContent className="p-6 flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{experience.role}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <span className="font-medium">{experience.company}</span>
                          <span>•</span>
                          <span>{experience.period}</span>
                        </div>
                        <p className="text-muted-foreground">{experience.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" onClick={() => handleEditExperience(experience)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDeleteExperience(experience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <ImageUrlInput
                        value={profileData.userLogo || ''}
                        onChange={(url) => setProfileData(prev => ({ ...prev, userLogo: url }))}
                        label="User Logo URL"
                      />
                      <p className="text-sm text-muted-foreground">
                        This image will appear in the header/navigation bar.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="bio">Bio / About Me</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio || ''}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Write a short bio about yourself..."
                        rows={6}
                      />
                      <p className="text-sm text-muted-foreground">
                        This text will appear in the &quot;About Me&quot; section above your work history.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;