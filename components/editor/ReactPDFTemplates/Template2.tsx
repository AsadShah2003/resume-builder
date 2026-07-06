import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
  },
  leftColumn: {
    width: '30%',
    padding: 20,
    color: '#ffffff',
  },
  rightColumn: {
    width: '70%',
    padding: 20,
  },
  expBlock: {
    marginBottom: 15,
  },
});

export const ReactPDFTemplate2 = ({ data, themeColor }: any) => {
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
    headerName: {
      fontSize: 22 * m,
      fontWeight: 700 as const,
      color: '#333333',
      textTransform: 'uppercase' as const,
      marginBottom: 5,
    },
    headerRole: {
      fontSize: 12 * m,
      color: '#666666',
      marginBottom: 20,
    },
    sectionTitleLeft: {
      fontSize: 14 * m,
      fontWeight: 700 as const,
      marginBottom: 10,
      marginTop: 20,
      textTransform: 'uppercase' as const,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.3)',
      paddingBottom: 5,
    },
    sectionTitleRight: {
      fontSize: 16 * m,
      fontWeight: 700 as const,
      color: '#333333',
      marginBottom: 10,
      marginTop: 20,
      textTransform: 'uppercase' as const,
      borderBottomWidth: 2,
      borderBottomColor: '#333333',
      paddingBottom: 5,
    },
    textLeft: { fontSize: 10 * m, marginBottom: 4 },
    textRight: { fontSize: 10 * m, marginBottom: 4, color: '#444444' },
    boldTextLeft: { fontSize: 10 * m, fontWeight: 700 as const, marginTop: 5 },
    expTitle: { fontSize: 12 * m, fontWeight: 700 as const, color: '#333333' },
    expCompany: { fontSize: 10 * m, color: '#666666', marginBottom: 5 },
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.leftColumn, { backgroundColor: themeColor || '#2c3e50' }]}>
          <Text style={dynStyles.sectionTitleLeft}>Contact</Text>
          <Text style={dynStyles.boldTextLeft}>Phone</Text>
          <Text style={dynStyles.textLeft}>{personalDetails?.phone}</Text>
          <Text style={dynStyles.boldTextLeft}>Email</Text>
          <Text style={dynStyles.textLeft}>{personalDetails?.email}</Text>
          <Text style={dynStyles.boldTextLeft}>Address</Text>
          <Text style={dynStyles.textLeft}>{personalDetails?.address}</Text>

          {socialLinks && socialLinks.length > 0 && (
            <View>
              <Text style={dynStyles.sectionTitleLeft}>Links</Text>
              {socialLinks.map((link: any, idx: number) => (
                <Text key={idx} style={dynStyles.textLeft}>{link.platform}: {link.link}</Text>
              ))}
            </View>
          )}

          {skills && skills.length > 0 && (
            <View>
              <Text style={dynStyles.sectionTitleLeft}>Skills</Text>
              {skills.map((skill: any, idx: number) => (
                <Text key={idx} style={dynStyles.textLeft}>{skill.title}</Text>
              ))}
            </View>
          )}

          {languages && languages.length > 0 && (
            <View>
              <Text style={dynStyles.sectionTitleLeft}>Languages</Text>
              {languages.map((lang: any, idx: number) => (
                <Text key={idx} style={dynStyles.textLeft}>{lang.language}</Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.rightColumn}>
          <Text style={dynStyles.headerName}>
            {personalDetails?.fname} {personalDetails?.lname}
          </Text>
          <Text style={dynStyles.headerRole}>{personalDetails?.role}</Text>

          {personalProfile && (
            <View>
              <Text style={dynStyles.sectionTitleRight}>Profile</Text>
              <Text style={dynStyles.textRight}>{personalProfile}</Text>
            </View>
          )}

          {workExperience && workExperience.length > 0 && (
            <View>
              <Text style={dynStyles.sectionTitleRight}>Work Experience</Text>
              {workExperience.map((work: any, idx: number) => (
                <View key={idx} style={styles.expBlock}>
                  <Text style={dynStyles.expTitle}>{work.jobTitle}</Text>
                  <Text style={dynStyles.expCompany}>
                    {work.jobCompany} | {work.jobStartDate} - {work.isStillWorking ? 'Present' : work.jobEndDate}
                  </Text>
                  <Text style={dynStyles.textRight}>{work.jobSummary}</Text>
                </View>
              ))}
            </View>
          )}

          {education && education.length > 0 && (
            <View>
              <Text style={dynStyles.sectionTitleRight}>Education</Text>
              {education.map((edu: any, idx: number) => (
                <View key={idx} style={styles.expBlock}>
                  <Text style={dynStyles.expTitle}>{edu.educationDegree}</Text>
                  <Text style={dynStyles.expCompany}>{edu.educationInstitute} | {edu.educationStartDate} - {edu.isStillStudying ? 'Present' : edu.educationEndDate}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
