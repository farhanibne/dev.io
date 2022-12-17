import Metamask from './Metamask'
import Link from 'next/link'

const Navbar = () => (
  <header className='header-tab'>
    <div className='header-container'>
    <div className='left'>
      <div className='logo'>DEV</div>
      <div style={{paddingLeft:'15px'}}>

      </div>
      <Link href='/?post=1' >
                  <span style={{background:'black',color:'azure',borderRadius:'5px',display:'flex',justifyContent:'center',alignItems:'center',padding:'5px'}}>Create Post</span>
                </Link>
      <header className='search '>
        <div className='search-wrap'>
          <div className='search-icon-wrap'></div>
         
        </div>
      </header>
    </div>
    <Metamask />

    </div>
  </header>
)

export default Navbar
