import React from 'react';

const Footer = () => {
  return (
    <div>
    {/* First Row */}
    <div style={{ backgroundColor: '#3a506b', padding: '20px', textAlign: 'center', color:'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {/* First Column */}
        <div style={{width:'65%', textAlign: 'justify'}}>
          <h3 style={{textAlign: 'center'}}>About Us</h3>
          <p>Welcome to our Application Design Studio, where passion meets innovation. We are a dedicated team of professionals driven by a shared commitment to excellence and a passion for projects. Our collaborative spirit fuels our creativity, and our diverse backgrounds empower us to deliver outstanding solutions to our clients.</p>
        </div>

        {/* Second Column */}
        <div style={{width:'30%'}}>
          <h3>Our Team</h3>
          <p>
            <span>Romel Dos Remedios - Sem-6/BTech. CCE</span><br />
            <span> Vishakha Singhal  - Sem-6/BTech. CSE </span><br />
            <span> Nandita Rawat - Sem-6/BTech. CSE-IOT</span><br />
            <span> Nupur Mehlawat - Sem-6/BTech. CSE-IOT</span><br />
            <span>Mahak Paliwal - Sem-3/BTech. CSE-IOT </span>
          </p>
        </div>
      </div>
    </div>

      {/* Second Row */}
      <div style={{ backgroundColor: '#1c2541', padding: '10px', textAlign: 'center', color: 'white', height:'80px' }}>
        <p>Made by TEAM-18 (Dell Hackathon).</p>
        <div>
          <p>Thank you for visiting!</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
