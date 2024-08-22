import { ImagePath } from '@/Constant'
import CommonLogo from '../Common/CommonLogo'
import { registerHorizontalData } from '@/Data/OtherPage/OtherPage'
import { PropsType } from '@/Type/OtherPages/OtherPages'
import Image from 'next/image'

const SideBarList:React.FC<PropsType> = ({ level } ) => {
  return (
    <ul className="anchor ">
      <li><CommonLogo /></li>
      <li>
        <div className="progresscont">
          <div className="circleblocks">
            <div className="user-profile">
              {registerHorizontalData.map((data, index) => (
                <div className={`${level === index + 1? "selected": level > index + 1? "done": "disabled"} ${data.class}`} key={index}>
                  <div className="circulo text-center">
                    {data.icon}
                  </div>
                  <div className="user-content">
                    <h4 className="font-primary">{data.tittle}</h4>
                    <h6>
                      {data.tittle === "Done" ? (<i className="fa fa-thumbs-o-up" />) : (" ")}
                    </h6>
                    <small>{data.detail}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
      <li>
        <Image width={399} height={300} src={`${ImagePath}/login/icon.png`} alt="loginpage" className='img-fluid w-100'/>
      </li>
    </ul>
  )
}

export default SideBarList