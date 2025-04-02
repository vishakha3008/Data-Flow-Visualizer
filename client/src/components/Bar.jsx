import React from 'react';
import img1 from '../Images/flow-1.jpg';
import img2 from '../Images/flow-2.jpg';
import vid1 from '../Images/flow-vid.mp4';


function Bar() {
  return (
    <>
      <div>
        <div class="row featurette" style={{ alignItems: 'center' }}>
          <div class="col-md-6" style={{ margin: '2% 4%' }}>
            <h2 class="featurette-heading fw-normal lh-1" style={{ color: 'white', fontStyle: 'normal', textAlign: 'end' }}>
              First featurette heading. <div class="text-body-secondary">Create Flow Models Easily.</div>
            </h2>
            <p class="lead" style={{ color: 'black', fontStyle: 'normal', textAlign: 'end', marginTop: '5%', fontSize: '1.5rem' }}>
              Visualize even the most complex flows with ease using a simple and visually appealing UI that is intuitive and easy to use.
            </p>
          </div>
          <div class="col-md-5" style={{ margin: '3% 0%' }}>
            <img src={img1} alt="Flow Model" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </div>

      <hr class="featurette-divider" style={{ margin: 0 }} />

      <div class="row featurette" style={{ alignItems: 'center' }}>
        <div class="col-md-4" style={{ margin: '3% 0% 3% 2%' }}>
        </div>
        <div class="col-md-5" style={{ margin: '3% 0%' }}>
          <img src={img2} alt="Flow Model" style={{ width: '100%', height: '50%' }} />
        </div>
        <div class="col-md-12" style={{ margin: '2% 4%' }}>
          <h2 class="featurette-heading fw-normal lh-1" style={{ color: 'white', fontStyle: 'normal', textAlign: 'center' }}>
            First featurette heading. <div class="text-body-secondary">Smooth Drag and Drop Feature.</div>
          </h2>
          <p class="lead" style={{ color: 'black', fontStyle: 'normal', textAlign: 'center', fontSize: '1.5rem' }}>
          User does not need any kind of prior knowledge to make the most of our website. Explore effortlessly, create what you need, and enjoy a seamless journey.
          </p>
        </div>
      </div>

      <hr class="featurette-divider" style={{ margin: 0 }} />

      <div class="row featurette" style={{ alignItems: 'center' }}>
        <div class="col-md-6" style={{ margin: '2% 4%' }}>
          <h2 class="featurette-heading fw-normal lh-1" style={{ color: 'white', fontStyle: 'normal', textAlign: 'end' }}>
            First featurette heading. <div class="text-body-secondary">It’ll blow your mind.</div>
          </h2>
          <p class="lead" style={{ color: 'black', fontStyle: 'normal', textAlign: 'end', fontSize: '1.5rem' }}>
          Bring your application flows to life with our smooth drag and drop functionality!!
          </p>
        </div>
        <div class="col-md-5" style={{ margin: '3% 0%' }}>
        <video width="640" height="360" controls>
        <source src={vid1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
      </div>
    </>
  );
}

export default Bar;
