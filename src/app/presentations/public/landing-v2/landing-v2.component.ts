import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { TimelineModule } from 'primeng/timeline';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface TestimonialCard {
  name: string;
  role: string;
  message: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-landing-v2',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    TabViewModule,
    TimelineModule,
    BadgeModule,
    AvatarModule,
    ChipModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './landing-v2.component.html',
  styleUrl: './landing-v2.component.scss'
})
export class LandingV2Component implements OnInit, AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featuresSection') featuresSection!: ElementRef;

  showContactModal = false;
  showDemoModal = false;
  contactForm: FormGroup;
  demoForm: FormGroup;
  
  features: FeatureCard[] = [
    {
      icon: 'pi pi-users',
      title: 'Child Management',
      description: 'Comprehensive child profiles, attendance tracking, and developmental milestones all in one place.',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      icon: 'pi pi-calendar',
      title: 'Smart Scheduling',
      description: 'AI-powered scheduling for activities, meals, naps, and parent communications with automated reminders.',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: 'pi pi-mobile',
      title: 'Parent Portal',
      description: 'Real-time updates, photos, and messages keep parents connected to their child\'s day.',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: 'pi pi-chart-line',
      title: 'Analytics Dashboard',
      description: 'Data-driven insights on attendance, development progress, and facility performance metrics.',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: 'pi pi-shield',
      title: 'Safety & Compliance',
      description: 'Built-in safety protocols, incident reporting, and regulatory compliance tracking.',
      color: 'bg-red-100 text-red-700'
    },
    {
      icon: 'pi pi-credit-card',
      title: 'Payment Processing',
      description: 'Automated billing, payment tracking, and financial reporting with multiple payment options.',
      color: 'bg-cyan-100 text-cyan-700'
    }
  ];

  testimonials: TestimonialCard[] = [
    {
      name: 'Sarah Johnson',
      role: 'Director, Sunshine Daycare',
      message: 'This platform transformed how we operate. Parent satisfaction increased by 95% and our admin time decreased by 60%.',
      avatar: 'S',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Owner, Little Learners Academy',
      message: 'The analytics and insights helped us optimize our programs. We\'ve seen remarkable improvements in child engagement.',
      avatar: 'M',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Manager, Kids Corner',
      message: 'Parents love the real-time updates and photo sharing. It\'s made communication so much easier and more meaningful.',
      avatar: 'E',
      rating: 5
    }
  ];

  stats = [
    { value: '10,000+', label: 'Children Managed' },
    { value: '500+', label: 'Facilities' },
    { value: '98%', label: 'Parent Satisfaction' },
    { value: '60%', label: 'Time Saved' }
  ];

  pricingPlans = [
    {
      name: 'Starter',
      price: 99,
      period: 'month',
      description: 'Perfect for small daycare centers',
      features: ['Up to 50 children', 'Basic parent portal', 'Attendance tracking', 'Email support'],
      popular: false,
      color: 'border-blue-200'
    },
    {
      name: 'Professional',
      price: 199,
      period: 'month',
      description: 'Ideal for growing facilities',
      features: ['Up to 200 children', 'Advanced analytics', 'Custom branding', 'Priority support', 'Payment processing'],
      popular: true,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: 399,
      period: 'month',
      description: 'For large organizations',
      features: ['Unlimited children', 'Multi-location support', 'API access', 'Dedicated support', 'Custom integrations'],
      popular: false,
      color: 'border-orange-200'
    }
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facility: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.demoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facility: ['', Validators.required],
      children: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  initAnimations() {
    // Hero section animation
    gsap.fromTo(this.heroSection.nativeElement.querySelector('.hero-content'), 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Features animation on scroll
    gsap.fromTo(this.featuresSection.nativeElement.querySelectorAll('.feature-card'), 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: this.featuresSection.nativeElement,
          start: 'top 80%'
        }
      }
    );
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  requestDemo() {
    this.showDemoModal = true;
  }

  contactUs() {
    this.showContactModal = true;
  }

  submitDemo() {
    if (this.demoForm.valid) {
      console.log('Demo request:', this.demoForm.value);
      this.showDemoModal = false;
      this.demoForm.reset();
    }
  }

  submitContact() {
    if (this.contactForm.valid) {
      console.log('Contact form:', this.contactForm.value);
      this.showContactModal = false;
      this.contactForm.reset();
    }
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  getStars(rating: number): string[] {
    return Array(rating).fill('pi pi-star-fill');
  }
}
