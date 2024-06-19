import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import colors from '../Assets/Colors/Colors';

const DownloadPdf = ({ details }) => {
  const handleDownloadPDF = async () => {
    try {
      // Replace 'https://your-pdf-generation-service.com' with the actual URL of your PDF generation service
      const pdfGenerationServiceUrl = 'https://your-pdf-generation-service.com/generate-pdf';

      // Make a request to the PDF generation service (replace with your actual API call)
      const response = await fetch(pdfGenerationServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details), // Send user details to the server for PDF generation
      });

      if (response.ok) {
        // Read the response as text (replace with actual response parsing logic)
        const pdfUrl = await response.text();

        // Open the generated PDF in the default web browser
        Linking.openURL(pdfUrl);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDownloadPDF}>
      <Text>Download PDF</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 16,
  },
});

export default DownloadPdf;
