import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Open Sans',
  },
  header: {
    padding: 20,
    color: '#ffffff',
  },
  body: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  leftColumn: {
    width: '35%',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  rightColumn: {
    width: '65%',
    padding: 20,
  },
  expBlock: {
    marginBottom: 12,
  },
  expCompany: {
    marginBottom: 4,
    color: '#555555',
  },
});

export const ReactPDFTemplate1 = ({ data, themeColor }: any) => {
  const {
    personalDetails,
    socialLinks,
    skills,
    languages,
    personalProfile,
    workExperience,
    education,
    resumeFontSize = 2,
  } = data;

  const m = resumeFontSize === 1 ? 0.9 : resumeFontSize === 2 ? 1.05 : 1.2;

  const dynStyles = {
    headerName: { fontSize: 24 * m, fontWeight: 700 as const },
    headerRole: { fontSize: 12 * m, marginTop: 4 },
    sectionTitle: {
      fontSize: 14 * m,
      fontWeight: 700 as const,
      textDecoration: 'underline' as const,
      marginBottom: 8,
      marginTop: 16,
      textTransform: 'uppercase' as const,
    },
    text: { fontSize: 10 * m, marginBottom: 4 },
    boldText: { fontSize: 10 * m, fontWeight: 700 as const, marginBottom: 2 },
    expTitle: { fontSize: 12 * m, fontWeight: 700 as const },
    expCompany: { fontSize: 10 * m },
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { backgroundColor: themeColor || '#145349' }]}>
          <Text style={dynStyles.headerName}>
            {personalDetails?.fname} {personalDetails?.lname}
          </Text>
          <Text style={dynStyles.headerRole}>{personalDetails?.role}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.leftColumn}>
            <View>
              <Text style={dynStyles.sectionTitle}>Details</Text>
              <Text style={dynStyles.boldText}>Address</Text>
              <Text style={dynStyles.text}>{personalDetails?.address}</Text>
              <Text style={dynStyles.boldText}>Phone</Text>
              <Text style={dynStyles.text}>{personalDetails?.phone}</Text>
              <Text style={dynStyles.boldText}>Email</Text>
              <Text style={dynStyles.text}>{personalDetails?.email}</Text>
            </View>

            {socialLinks && socialLinks.length > 0 && (
              <View>
                <Text style={dynStyles.sectionTitle}>Links</Text>
                {socialLinks.map((link: any, idx: number) => (
                  <Text key={idx} style={dynStyles.text}>{link.platform}: {link.link}</Text>
                ))}
              </View>
            )}

            {skills && skills.length > 0 && (
              <View>
                <Text style={dynStyles.sectionTitle}>Skills</Text>
                {skills.map((skill: any, idx: number) => (
                  <Text key={idx} style={dynStyles.text}>{skill.title}</Text>
                ))}
              </View>
            )}

            {languages && languages.length > 0 && (
              <View>
                <Text style={dynStyles.sectionTitle}>Languages</Text>
                {languages.map((lang: any, idx: number) => (
                  <Text key={idx} style={dynStyles.text}>{lang.language}</Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {personalProfile && (
              <View>
                <Text style={dynStyles.sectionTitle}>Profile</Text>
                <Text style={dynStyles.text}>{personalProfile}</Text>
              </View>
            )}

            {workExperience && workExperience.length > 0 && (
              <View>
                <Text style={dynStyles.sectionTitle}>Experience</Text>
                {workExperience.map((work: any, idx: number) => (
                  <View key={idx} style={styles.expBlock}>
                    <Text style={dynStyles.expTitle}>{work.jobTitle}</Text>
                    <Text style={[styles.expCompany, dynStyles.expCompany]}>
                      {work.jobCompany} | {work.jobStartDate} - {work.isStillWorking ? 'Present' : work.jobEndDate}
                    </Text>
                    <Text style={dynStyles.text}>{work.jobSummary}</Text>
                  </View>
                ))}
              </View>
            )}

            {education && education.length > 0 && (
              <View>
                <Text style={dynStyles.sectionTitle}>Education</Text>
                {education.map((edu: any, idx: number) => (
                  <View key={idx} style={styles.expBlock}>
                    <Text style={dynStyles.expTitle}>{edu.educationDegree}</Text>
                    <Text style={[styles.expCompany, dynStyles.expCompany]}>{edu.educationInstitute} | {edu.educationStartDate} - {edu.isStillStudying ? 'Present' : edu.educationEndDate}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
