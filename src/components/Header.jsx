import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">Teknolojik Yemekler</h1>
            <div className="breadcrumb">
              <Link to="/" >
                Anasayfa
              </Link>  - <span className="order-link">    <Link to="/" style={{ fontWeight: 700 }} >
                Sipariş Oluştur
              </Link></span>
            </div>
          </div>
    </header>

  )
}