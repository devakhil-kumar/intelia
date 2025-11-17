import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import ImagePath from '../../../contexts/ImagePath';
import { SafeAreaView } from 'react-native-safe-area-context';

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <View style={styles.card}>
      <View style={styles.companyHeader}>
        <Image
          source={ImagePath.companyProfile}
          style={styles.companyLogo}
        />
        <Text style={styles.companyName}>{job.companyName}</Text>
      </View>
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{job.jobType}</Text>
        </View>
      </View>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobDescription}>{job.description}</Text>
      <Text style={styles.keyInfo}>{job.keyInfo}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.savedButton}>
          <View style={styles.bookmarkIcon}>
            <Text style={styles.bookmarkText}>🔖</Text>
          </View>
          <Text style={styles.savedText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AllJobsScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const jobs = [
    {
      id: 1,
      companyLogo: 'https://via.placeholder.com/40/333333/FFFFFF?text=C',
      companyName: 'Company name',
      jobType: 'Full-Time',
      title: 'Job title / Role',
      description: 'This will the mini job description. Deliver parcels across assigned sectors with punctuality.',
      keyInfo: 'Key info: ₹12,000/week | 6 days/week | Light vehicle'
    },
    {
      id: 2,
      companyLogo: 'https://via.placeholder.com/40/3B82F6/FFFFFF?text=T',
      companyName: 'Tech Solutions Ltd',
      jobType: 'Part-Time',
      title: 'Software Developer',
      description: 'Work on exciting projects with modern technologies. Flexible hours and remote work available.',
      keyInfo: 'Key info: ₹25,000/week | 4 days/week | Remote'
    },
    {
      id: 3,
      companyLogo: 'https://via.placeholder.com/40/10B981/FFFFFF?text=D',
      companyName: 'Design Studio Inc',
      jobType: 'Full-Time',
      title: 'UI/UX Designer',
      description: 'Create beautiful and functional designs for web and mobile applications.',
      keyInfo: 'Key info: ₹18,000/week | 5 days/week | Office'
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[0, 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'all' && styles.activeTab]}
              onPress={() => setActiveTab('all')}
            >
              <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                All Jobs
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingBottom: 80
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row'
  },
  tab: {
    paddingBottom: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: '#3B82F6'
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF'
  },
  activeTabText: {
    color: '#1F2937'
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginRight: 6
  },
  chevron: {
    fontSize: 10,
    color: '#6B7280'
  },

  // ScrollView styles
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 16
  },

  // Card styles
  card: {
    backgroundColor: '#F9F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#E5E7EB'
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937'
  },
  badgeContainer: {
    marginBottom: 12
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6366F1'
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8
  },
  jobDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12
  },
  keyInfo: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 16
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  savedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6
  },
  bookmarkText: {
    fontSize: 14
  },
  savedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D97706'
  },
  applyButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3B82F6'
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6'
  }
});

export default AllJobsScreen;