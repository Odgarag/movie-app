import { Film, Mail, Phone } from 'lucide-react'

export const Footer = () => {
  return (
    <div className="bg-indigo-700 relative top-80 mt-[51px] flex justify-around pt-[40px] pb-[40px] flex-col sm:top-100 sm:flex-row pl-[20px] pr-[20px] text-white">
      <div>
        {' '}
        <div>
          <div className={'flex gap-2 justify-start text-white-900 '}>
            <Film />
            <p className="w-[64px]">
              <i>
                <b>Movie Z</b>
              </i>
            </p>
          </div>{' '}
          <p className="text-[14px]">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
      </div>
      <div className="flex gap-[96px] text-[14px]">
        <div>
          <p>Contact Heading</p>
          <div className="flex items-center gap-[12px] mt-[12px]">
            <Mail width={'16px'} height={'16px'} />
            <div>
              <p>Email:</p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex items-center gap-[12px] mt-[24px]">
            {' '}
            <Phone width={'16px'} height={'16px'} />
            <div>
              <p>Phone:</p>
              <p>+976(11)123-4567</p>
            </div>
          </div>
        </div>

        <div>
          <p>Follow us</p>
          <div className="flex gap-[12px] flex-col sm:flex-row">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
  )
}
