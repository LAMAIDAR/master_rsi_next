export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">

        {/* Présentation */}
        <div className="f-col" style={{ maxWidth: 250 }}>
          <div className="f-logos">
            <img src="/images/fst.png"  alt="FST" onError={e => (e.currentTarget.style.display='none')} />
            <img src="/images/fst1.png" alt="UH1" onError={e => (e.currentTarget.style.display='none')} />
          </div>
          <div className="f-tagline">
            Faculté des Sciences et Techniques de Settat,<br />
            composante de l&apos;Université Hassan I<sup>er</sup>.<br />
            Formation d&apos;excellence – Master RSI.
          </div>
        </div>

        {/* Coordonnées */}
        <div className="f-col">
          <h4><i className="fa fa-address-book"></i> Coordonnées</h4>
          <ul className="info-list">
            <li><i className="fa fa-map-marker-alt"></i> Km 3, Route de Casablanca – B.P. 577, 26000 Settat, Maroc</li>
            <li><i className="fa fa-phone"></i><a href="tel:+212523400736">+212 5234-00736</a></li>
            <li><i className="fa fa-fax"></i><a href="tel:+212523400737">+212 5234-00737</a></li>
            <li><i className="fa fa-envelope"></i><a href="mailto:contact_fsts@uhp.ac.ma">contact_fsts@uhp.ac.ma</a></li>
            <li><i className="fa fa-globe"></i><a href="https://www.fsts.ac.ma" target="_blank">www.fsts.ac.ma</a></li>
            <li><i className="fa fa-university"></i><a href="https://www.uh1.ac.ma" target="_blank">www.uh1.ac.ma</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className="f-col">
          <h4><i className="fa fa-share-alt"></i> Suivez-nous</h4>
          <div className="socials">
            <a className="soc-btn" href="https://www.facebook.com/fstsettatofficiel" target="_blank">
              <i className="fab fa-facebook-f" style={{ color: '#1877f2' }}></i> Facebook
            </a>
            <a className="soc-btn" href="https://www.linkedin.com/school/fst-settat" target="_blank">
              <i className="fab fa-linkedin-in" style={{ color: '#0a66c2' }}></i> LinkedIn
            </a>
            <a className="soc-btn" href="https://www.instagram.com/fstsettat" target="_blank">
              <i className="fab fa-instagram" style={{ color: '#e1306c' }}></i> Instagram
            </a>
            <a className="soc-btn" href="https://www.youtube.com/@fstsettat" target="_blank">
              <i className="fab fa-youtube" style={{ color: '#ff0000' }}></i> YouTube
            </a>
            <a className="soc-btn" href="https://www.fsts.ac.ma" target="_blank">
              <i className="fa fa-globe" style={{ color: '#e8a020' }}></i> Site officiel
            </a>
          </div>
        </div>

        {/* Carte */}
        <div className="f-col" style={{ minWidth: 220, maxWidth: 270 }}>
          <h4><i className="fa fa-map"></i> Localisation</h4>
          <div className="f-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.970328812372!2d-7.619079925249059!3d33.030912170969216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda61aabf2a6a8b9%3A0xe6a579c28d993de9!2zRlNUIDogRmFjdWx0w6kgZGVzIFNjaWVuY2VzIGV0IFRlY2huaXF1ZSDZg9mE2YrYqSDYp9mE2LnZhNmI2YUg2Ygg2KfZhNiq2YLZhdmK2KfYqiDYs9i32KfYqnNfU2V0dGF0!5e0!3m2!1sfr!2sus!4v1776528861801!5m2!1sfr!2sus"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
          <p className="f-map-label">Km 3, Route de Casablanca, 26000 Settat</p>
        </div>

      </div>
      <div className="footer-bar">
        &copy; {new Date().getFullYear()} –{' '}
        <a href="https://www.fsts.ac.ma" target="_blank">FST Settat</a> &nbsp;·&nbsp;
        <a href="https://www.uh1.ac.ma" target="_blank">Université Hassan I<sup>er</sup></a>
        &nbsp;·&nbsp; Master RSI – Langage du Web &nbsp;·&nbsp; Pr. Sofia El Amoury
      </div>
    </footer>
  )
}