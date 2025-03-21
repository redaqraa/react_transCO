
/**
 * Utility to generate and download a trip summary
 */

export const generateTripSummary = (bookingDetails: {
  destination: string;
  destinationName: string;
  people: number;
  checkin: string;
  checkout: string;
  totalPrice: number;
  fullName: string;
}) => {
  const { destination, destinationName, people, checkin, checkout, totalPrice, fullName } = bookingDetails;
  
  // Create a formatted date string
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateStr;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Create the content for our trip summary
  const content = `
    TransCO Travel - Booking Confirmation
    ---------------------------------------
    
    Dear ${fullName},
    
    Thank you for booking with TransCO Travel. Your trip has been confirmed.
    
    Booking Details:
    ---------------------------------------
    Destination: ${destinationName}
    Number of travelers: ${people}
    Check-in date: ${formatDate(checkin)}
    Check-out date: ${formatDate(checkout)}
    
    Payment Information:
    ---------------------------------------
    Total Amount: ${formatCurrency(totalPrice)}
    Payment Status: Completed
    
    Please keep this confirmation for your records.
    If you have any questions, please contact our customer service.
    
    Thank you for choosing TransCO Travel!
    We hope you enjoy your trip.
    
    ---------------------------------------
    Booking Reference: TRN-${Date.now().toString().substring(5)}
    Issued on: ${new Date().toLocaleDateString()}
  `;

  // Create a blob from the text content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = `TransCO_Booking_${destination}_${Date.now()}.txt`;
  
  // Append link to the body, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Revoke the blob URL
  URL.revokeObjectURL(url);
  
  return true;
};
