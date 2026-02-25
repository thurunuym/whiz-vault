import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BankCard = ({account, userName, showBalance=true}:CreditCardProps) => {
  return (
    <div className="flex flex-col">
      <Link href="/" className="bank-card">
      
        <div className='bank-card_content'>
            <div>
                <h1>{account.name || userName}</h1>
                <p className=''>{formatAmount(account.currentBalance)}</p>
            </div>
        </div>
        <article>
            <div>
                <h1>{userName}</h1>
                <h2>**/**</h2>
                <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                **** **** **** <span className='text-16'>{4455}</span>
                </p>
            </div>
        </article>
        <div className="bank-card">
            <Image
            src="icons/Paypass.svg"
            alt="pay"
            width={20}
            height={24}
            />
            <Image
            src="icons/mastercard.svg"
            alt="mastercard"
            width={45}
            height={32}
            />
        </div>
        <Image
        src="icons/lines.svg"
        alt="lines"
        width={316}
        height={190}
        className='absolute top-0 left-0'
        />
      </Link>
    </div>
  )
}
   

export default BankCard
