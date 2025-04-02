import Bar from './Bar';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
  return (
    <div >
      <Navbar />
      <div className="bg-dark text-secondary px-4 py-5 text-center">
    <div className="py-5">
      
      <h1 style={{ color: 'yellow', fontStyle: 'normal', textAlign: 'center', fontSize:'3.2rem' }} className="display-5 fw-bold">APPLICATION DESIGN STUDIO</h1>
      <div className="col-lg-6 mx-auto">
        <p className="fs-5 mb-4 text-white" style={{paddingTop:'3%', textAlign:'justify', fontWeight:'lighter'}}>ADS streamlines enterprise integrations with an intuitive web-based editor, providing efficient modeling. Tailored for developers and integration teams, it simplifies complex integrations and ensures streamlined data flow management. Utilizing MERN Stack, Docker, and Kubernetes, the project, led by Girish, is an ongoing effort for continuous improvement.</p>  
      </div>
    </div>
  </div>
  <Bar />
  <Footer />
    </div>
    
  )
}

export default Home;
