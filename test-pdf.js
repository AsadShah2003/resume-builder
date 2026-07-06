const React = require('react');
const { pdf, Document, Page, Text, View, StyleSheet, Font } = require('@react-pdf/renderer');

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'Open Sans' },
  expBlock: { marginBottom: 12 },
  expCompany: { fontStyle: 'italic', marginBottom: 4 },
});

const dynStyles = {
  sectionTitle: { fontSize: 14, fontWeight: 700 },
  expTitle: { fontSize: 12, fontWeight: 700 },
  expCompany: { fontSize: 10 },
  text: { fontSize: 10, marginBottom: 4 },
};

const Template1 = ({ data }) => {
  const { workExperience } = data;
  return React.createElement(Document, null, 
    React.createElement(Page, { size: "A4", style: styles.page }, 
      workExperience && workExperience.length > 0 && React.createElement(View, null, 
        React.createElement(Text, { style: dynStyles.sectionTitle }, "Experience"),
        workExperience.map((work, idx) => 
          React.createElement(View, { key: idx, style: styles.expBlock }, 
            React.createElement(Text, { style: dynStyles.expTitle }, work.jobTitle),
            React.createElement(Text, { style: [styles.expCompany, dynStyles.expCompany] }, 
              `${work.jobCompany} | ${work.jobStartDate} - ${work.isStillWorking ? 'Present' : work.jobEndDate}`
            ),
            React.createElement(Text, { style: dynStyles.text }, work.jobSummary)
          )
        )
      )
    )
  );
};

async function test() {
  const data = {
    workExperience: [
      {
        id: 1,
        jobTitle: "Software Engineer",
        jobCompany: "Google",
        jobStartDate: "Jan 2020",
        jobEndDate: "Dec 2021",
        isStillWorking: false,
        jobSummary: "Did some coding\nAnd more coding"
      }
    ]
  };

  try {
    const doc = React.createElement(Template1, { data });
    const buffer = await pdf(doc).toBuffer();
    console.log("SUCCESS! Buffer size:", buffer.length);
  } catch (err) {
    console.error("ERROR:", err.message);
    console.error(err.stack);
  }
}

test();
