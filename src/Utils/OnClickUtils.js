export const handleDownload = (fileName, filePath) => {
  const fileUrl = process.env.PUBLIC_URL + filePath;
  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleContactEmail = () => {
  const emailAddress = "shoqibulatzmi@gmail.com";
  const subject = "Job Opportunities";
  const body = `Dear Rizqi,

  I hope this email finds you well.
  
  I recently visited your portfolio website and was impressed by your work and experience in Data Entry. I am reaching out to inquire about any job opportunities or freelance projects you may have available.
  
  ...
  `;
  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.open(mailtoUrl);
};
