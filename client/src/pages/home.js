import React from 'react'
import "../App.css"

export default () => {
  return (
    <div className="App">
    <header className="masthead">
    <div className="container">
      <div className="intro-text">
        <div className="intro-lead-in">Welcome To Soak</div>
        <div className="intro-lead-in">A Social Media Platform</div>
        <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Features</a>
      </div>
    </div>
  </header>

  
  <section className="page-section" id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Features</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Secured with Authentication</h4>
          <p className="text-muted">See the secured world of Soak within a clicks. Just signup if you have not joined the world of Soak and if you are the member of Soak just login.</p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Add and Delete Post</h4>
          <p className="text-muted">You can upload image and add caption in the posts. You can see yours and other users posts also. You can also delete your posts in the Soak. </p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Like and Comment</h4>
          <p className="text-muted">You can Like or unlike any posts as well as comment on the posts. Like and comment count will be visible to every user. You can see other users comments also.</p>
            </div>
            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Get Notifications</h4>
          <p className="text-muted">You will get notifications of every activity on your posts. If some one like or comment on your post the you will get notified.</p>
            </div>
            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">Modify the Profile Details</h4>
          <p className="text-muted">You can change your profile image and your bio, location and website name when ever you like.</p>
            </div>
            <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
          </span>
          <h4 className="service-heading">View another User</h4>
          <p className="text-muted">You can see another users profile details like their profile image, bio, location, website name and the date when they joined the world of Soak.</p>
        </div>
      </div>
    </div>
  </section>
  
  <footer className="footer">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <span className="copyright">Copyright &copy; Soak 2020</span>
        </div>
        <div className="col-md-4">
          <ul className="list-inline social-buttons">
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-facebook-f"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#something">
                <i className="fa fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
            </div>
            <div className="col-md-4">
          <span >Created on August 2020</span>
        </div>
      </div>
    </div>
  </footer>
  </div>
    )
}