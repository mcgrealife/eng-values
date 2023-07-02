import styles from './LanguageSelect.module.css'
import { getFlagCode, langCodes } from '@/pages/api/v1/translate/[langCode]'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { selectLanguage, setLanguage } from '@/lib/redux/store'
import { reduxToast } from '../Toast/ReduxToast'

export default function LanguageSelect() {
  const language = useSelector(selectLanguage)
  const dispatch = useDispatch()

  return (
    <div className={styles.con}>
      <label
        htmlFor='quote-languages'
        className={styles.languageSelectorInput_trigger}>
        <Image
          src={`/flag-icons/${getFlagCode(language.langCode)}.png`}
          width={23}
          height={17}
          alt='country-flag'
        />
        <select
          id='quote-languages'
          value={language.langCode}
          onChange={(e) => {
            const langObj = langCodes.find(
              (lc) => lc.langCode == e.target.value
            )
            if (!langObj) return
            dispatch(setLanguage(langObj))
            reduxToast(`Dispatch => setLanguageCode( ${langObj.langCode} )`)
          }}
          style={{
            width: `${language.name.length + 1}ch`,
          }}
          className={styles.languageSelectorInput_dropdown}>
          {langCodes.map((c) => (
            <option
              key={c.langCode}
              value={c.langCode}
              className={styles.select}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
