// Regional calendars: Hindi, Marathi, Gujarati, Kannada, Telugu (lunar), Tamil, Malayalam, Bengali, Odia, Punjabi,
// Assamese (solar) and the Islamic (Hijri) calendar. Each gets a hub page, two year pages and 24 month pages per language.
// **Edit CALS to add a calendar or fix a name.**
'use strict';
const S = require('./astro');
const { T, fmtTime, fmtDate, fmtDateTime, tithiName, pakshaName, MONTH_EN, MONTH_HI, WD_EN, WD_HI } = require('./i18n');
const U = require('./ui');
const P = require('./pages');
const { esc, url, abs, page, moonSvg, adSlot, breadcrumbs, faqHtml, faqLd } = U;

const C = () => P.ctx();
const L = (lang, en, hi) => (lang === 'hi' ? hi : en);

// 60-year cycle (South Indian reckoning; Prabhava = 1987-88). Used by the Marathi, Kannada, Telugu and Tamil calendars.
const SAMVATSARA = ['Prabhava', 'Vibhava', 'Shukla', 'Pramoda', 'Prajapati', 'Angirasa', 'Shrimukha', 'Bhava', 'Yuva', 'Dhatri', 'Ishvara', 'Bahudhanya', 'Pramathi', 'Vikrama', 'Vrisha', 'Chitrabhanu', 'Subhanu', 'Tarana', 'Parthiva', 'Vyaya', 'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikriti', 'Khara', 'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukha', 'Hemalamba', 'Vilamba', 'Vikari', 'Sharvari', 'Plava', 'Shubhakrit', 'Shobhakrit', 'Krodhi', 'Vishvavasu', 'Parabhava', 'Plavanga', 'Kilaka', 'Saumya', 'Sadharana', 'Virodhakrit', 'Paridhavi', 'Pramadi', 'Ananda', 'Rakshasa', 'Nala', 'Pingala', 'Kalayukta', 'Siddharthi', 'Raudra', 'Durmati', 'Dundubhi', 'Rudhirodgari', 'Raktaksha', 'Krodhana', 'Akshaya'];

const NORTH = ['Delhi', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Jharkhand', 'Chhattisgarh', 'Chandigarh', 'Jammu and Kashmir'];
const BN_HI_MONTHS = ['बैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'अग्रहायण', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'];

// kind 'lunar': months[] are indexed Chaitra..Phalguna. kind 'solar': months[] are indexed by the sidereal sign the Sun
// enters (Mesha..Meena). kind 'hijri': Muharram..Dhu al-Hijjah.
// era: { label, offset, start } – year = Gregorian year of the month that starts the year + offset.
const CALS = [
  {
    slug: 'hindi', name: { en: 'Hindi', hi: 'हिंदी' }, native: 'हिंदी कैलेंडर', tag: 'hi', kind: 'lunar', scheme: 'purnimanta', city: 'delhi', states: NORTH,
    region: { en: 'North India', hi: 'उत्तर भारत' }, alt: { en: 'Hindu Panchang', hi: 'हिंदू पंचांग' },
    era: { label: { en: 'Vikram Samvat', hi: 'विक्रम संवत' }, offset: 57, start: 0 },
    months: S.MONTHS_HI, monthsEn: S.MONTHS,
    wd: WD_HI, tithi: ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'], amavasya: 'अमावस्या', paksha: ['शुक्ल', 'कृष्ण'],
    about: {
      en: 'The Hindi calendar (Hindu Panchang) used across North India counts years in Vikram Samvat and follows the Purnimanta system: each month ends on Purnima (full moon), so the Krishna Paksha comes first and the Shukla Paksha second. The year begins on Chaitra Shukla Pratipada.',
      hi: 'उत्तर भारत में प्रचलित हिंदी कैलेंडर (हिंदू पंचांग) विक्रम संवत में वर्ष गिनता है और पूर्णिमांत पद्धति मानता है: हर मास पूर्णिमा पर समाप्त होता है, इसलिए पहले कृष्ण पक्ष और फिर शुक्ल पक्ष आता है। वर्ष चैत्र शुक्ल प्रतिपदा से शुरू होता है।',
    },
  },
  {
    slug: 'marathi', name: { en: 'Marathi', hi: 'मराठी' }, native: 'मराठी दिनदर्शिका', tag: 'mr', kind: 'lunar', scheme: 'amanta', city: 'mumbai', states: ['Maharashtra', 'Goa'],
    region: { en: 'Maharashtra and Goa', hi: 'महाराष्ट्र और गोवा' }, alt: { en: 'Marathi Panchang', hi: 'मराठी पंचांग' }, samv: true,
    era: { label: { en: 'Shaka', hi: 'शक संवत' }, offset: -78, start: 0 },
    months: ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ', 'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'], monthsEn: S.MONTHS,
    wd: ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    tithi: ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पौर्णिमा'], amavasya: 'अमावस्या', paksha: ['शुक्ल', 'कृष्ण'],
    about: {
      en: 'The Marathi calendar follows the Shalivahana Shaka era and the Amanta system: each month ends on Amavasya (new moon). The year begins on Gudi Padwa, Chaitra Shukla Pratipada.',
      hi: 'मराठी कैलेंडर शालिवाहन शक संवत और अमांत पद्धति पर चलता है: हर मास अमावस्या पर समाप्त होता है। वर्ष गुड़ी पड़वा (चैत्र शुक्ल प्रतिपदा) से शुरू होता है।',
    },
  },
  {
    slug: 'gujarati', name: { en: 'Gujarati', hi: 'गुजराती' }, native: 'ગુજરાતી કેલેન્ડર', tag: 'gu', kind: 'lunar', scheme: 'amanta', city: 'ahmedabad', states: ['Gujarat', 'Dadra and Nagar Haveli and Daman and Diu'],
    region: { en: 'Gujarat', hi: 'गुजरात' }, alt: { en: 'Gujarati Panchang', hi: 'गुजराती पंचांग' },
    era: { label: { en: 'Vikram Samvat', hi: 'विक्रम संवत' }, offset: 57, start: 7 },
    months: ['ચૈત્ર', 'વૈશાખ', 'જેઠ', 'અષાઢ', 'શ્રાવણ', 'ભાદરવો', 'આસો', 'કારતક', 'માગશર', 'પોષ', 'મહા', 'ફાગણ'],
    monthsEn: ['Chaitra', 'Vaishakh', 'Jeth', 'Ashadh', 'Shravan', 'Bhadarvo', 'Aso', 'Kartak', 'Magshar', 'Posh', 'Maha', 'Fagan'],
    monthsHi: ['चैत्र', 'वैशाख', 'जेठ', 'अषाढ़', 'श्रावण', 'भादरवो', 'आसो', 'कारतक', 'मागशर', 'पोष', 'महा', 'फागण'],
    wd: ['રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'],
    tithi: ['એકમ', 'બીજ', 'ત્રીજ', 'ચોથ', 'પાંચમ', 'છઠ', 'સાતમ', 'આઠમ', 'નોમ', 'દશમ', 'અગિયારસ', 'બારસ', 'તેરસ', 'ચૌદશ', 'પૂનમ'], amavasya: 'અમાસ', paksha: ['સુદ', 'વદ'],
    about: {
      en: 'The Gujarati calendar uses Vikram Samvat with Amanta months, and its new year (Bestu Varas) falls on Kartak Sud Ekam, the day after Diwali. Sud is the bright half and Vad the dark half of the month.',
      hi: 'गुजराती कैलेंडर अमांत मासों वाला विक्रम संवत मानता है और इसका नया साल (बेस्तु वरस) दिवाली के अगले दिन, कारतक सुद एकम को होता है। सुद शुक्ल पक्ष है और वद कृष्ण पक्ष।',
    },
  },
  {
    slug: 'kannada', name: { en: 'Kannada', hi: 'कन्नड़' }, native: 'ಕನ್ನಡ ಕ್ಯಾಲೆಂಡರ್', tag: 'kn', kind: 'lunar', scheme: 'amanta', city: 'bengaluru', states: ['Karnataka'],
    region: { en: 'Karnataka', hi: 'कर्नाटक' }, alt: { en: 'Kannada Panchanga', hi: 'कन्नड़ पंचांग' }, samv: true,
    era: { label: { en: 'Shaka', hi: 'शक संवत' }, offset: -78, start: 0 },
    months: ['ಚೈತ್ರ', 'ವೈಶಾಖ', 'ಜ್ಯೇಷ್ಠ', 'ಆಷಾಢ', 'ಶ್ರಾವಣ', 'ಭಾದ್ರಪದ', 'ಆಶ್ವಯುಜ', 'ಕಾರ್ತಿಕ', 'ಮಾರ್ಗಶಿರ', 'ಪುಷ್ಯ', 'ಮಾಘ', 'ಫಾಲ್ಗುಣ'],
    monthsEn: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashvayuja', 'Kartika', 'Margashira', 'Pushya', 'Magha', 'Phalguna'],
    wd: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'],
    tithi: ['ಪಾಡ್ಯ', 'ಬಿದಿಗೆ', 'ತದಿಗೆ', 'ಚೌತಿ', 'ಪಂಚಮಿ', 'ಷಷ್ಠಿ', 'ಸಪ್ತಮಿ', 'ಅಷ್ಟಮಿ', 'ನವಮಿ', 'ದಶಮಿ', 'ಏಕಾದಶಿ', 'ದ್ವಾದಶಿ', 'ತ್ರಯೋದಶಿ', 'ಚತುರ್ದಶಿ', 'ಹುಣ್ಣಿಮೆ'], amavasya: 'ಅಮಾವಾಸ್ಯೆ', paksha: ['ಶುಕ್ಲ', 'ಕೃಷ್ಣ'],
    about: {
      en: 'The Kannada calendar (Kannada Panchanga) follows the Shalivahana Shaka era with Amanta lunar months. The year begins on Ugadi, Chaitra Shukla Padya, and each year carries one of 60 samvatsara names.',
      hi: 'कन्नड़ कैलेंडर (कन्नड़ पंचांग) अमांत चंद्र मासों वाला शालिवाहन शक संवत मानता है। वर्ष युगादि (चैत्र शुक्ल प्रतिपदा) से शुरू होता है और हर वर्ष का 60 संवत्सरों में से एक नाम होता है।',
    },
  },
  {
    slug: 'telugu', name: { en: 'Telugu', hi: 'तेलुगु' }, native: 'తెలుగు క్యాలెండర్', tag: 'te', kind: 'lunar', scheme: 'amanta', city: 'hyderabad', states: ['Andhra Pradesh', 'Telangana'],
    region: { en: 'Andhra Pradesh and Telangana', hi: 'आंध्र प्रदेश और तेलंगाना' }, alt: { en: 'Telugu Panchangam', hi: 'तेलुगु पंचांगम' }, samv: true,
    era: { label: { en: 'Shaka', hi: 'शक संवत' }, offset: -78, start: 0 },
    months: ['చైత్రం', 'వైశాఖం', 'జ్యేష్ఠం', 'ఆషాఢం', 'శ్రావణం', 'భాద్రపదం', 'ఆశ్వయుజం', 'కార్తీకం', 'మార్గశిరం', 'పుష్యం', 'మాఘం', 'ఫాల్గుణం'],
    monthsEn: ['Chaitram', 'Vaishakham', 'Jyeshtham', 'Ashadham', 'Shravanam', 'Bhadrapadam', 'Ashvayujam', 'Kartikam', 'Margashiram', 'Pushyam', 'Magham', 'Phalgunam'],
    wd: ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'],
    tithi: ['పాడ్యమి', 'విదియ', 'తదియ', 'చవితి', 'పంచమి', 'షష్ఠి', 'సప్తమి', 'అష్టమి', 'నవమి', 'దశమి', 'ఏకాదశి', 'ద్వాదశి', 'త్రయోదశి', 'చతుర్దశి', 'పౌర్ణమి'], amavasya: 'అమావాస్య', paksha: ['శుక్ల', 'కృష్ణ'],
    about: {
      en: 'The Telugu calendar (Telugu Panchangam) follows the Shalivahana Shaka era with Amanta lunar months. The year begins on Ugadi, Chaitra Shukla Padyami, and each year carries one of 60 samvatsara names.',
      hi: 'तेलुगु कैलेंडर (तेलुगु पंचांगम) अमांत चंद्र मासों वाला शालिवाहन शक संवत मानता है। वर्ष उगादि (चैत्र शुक्ल प्रतिपदा) से शुरू होता है और हर वर्ष का 60 संवत्सरों में से एक नाम होता है।',
    },
  },
  {
    slug: 'tamil', name: { en: 'Tamil', hi: 'तमिल' }, native: 'தமிழ் நாட்காட்டி', tag: 'ta', kind: 'solar', style: 'tamil', city: 'chennai', states: ['Tamil Nadu', 'Puducherry'],
    region: { en: 'Tamil Nadu and Puducherry', hi: 'तमिलनाडु और पुडुचेरी' }, alt: { en: 'Tamil Panchangam', hi: 'तमिल पंचांगम' }, samv: true, era: { start: 0 },
    months: ['சித்திரை', 'வைகாசி', 'ஆனி', 'ஆடி', 'ஆவணி', 'புரட்டாசி', 'ஐப்பசி', 'கார்த்திகை', 'மார்கழி', 'தை', 'மாசி', 'பங்குனி'],
    monthsEn: ['Chithirai', 'Vaikasi', 'Aani', 'Aadi', 'Aavani', 'Purattasi', 'Aippasi', 'Karthigai', 'Margazhi', 'Thai', 'Maasi', 'Panguni'],
    monthsHi: ['चित्तिरै', 'वैकासी', 'आनी', 'आडी', 'आवणी', 'पुरट्टासी', 'ऐप्पसी', 'कार्तिगै', 'मार्गळी', 'तै', 'मासी', 'पंगुनी'],
    wd: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
    tithi: ['பிரதமை', 'துவிதியை', 'திருதியை', 'சதுர்த்தி', 'பஞ்சமி', 'சஷ்டி', 'சப்தமி', 'அஷ்டமி', 'நவமி', 'தசமி', 'ஏகாதசி', 'துவாதசி', 'திரயோதசி', 'சதுர்த்தசி', 'பௌர்ணமி'], amavasya: 'அமாவாசை', paksha: ['வளர்பிறை', 'தேய்பிறை'],
    about: {
      en: 'The Tamil calendar is a solar calendar: a new month begins when the Sun enters the next sidereal sign (if that happens before sunset, the same day is the 1st). The year begins on Chithirai 1 (Puthandu) in mid-April, and each year carries one of 60 names.',
      hi: 'तमिल कैलेंडर सौर कैलेंडर है: जब सूर्य अगली निरयण राशि में प्रवेश करता है तब नया मास शुरू होता है (प्रवेश सूर्यास्त से पहले हो तो वही दिन पहली तारीख है)। वर्ष अप्रैल के मध्य में चित्तिरै 1 (पुत्तांडु) से शुरू होता है।',
    },
  },
  {
    slug: 'malayalam', name: { en: 'Malayalam', hi: 'मलयालम' }, native: 'മലയാളം കലണ്ടർ', tag: 'ml', kind: 'solar', style: 'kerala', city: 'thiruvananthapuram', states: ['Kerala', 'Lakshadweep'],
    region: { en: 'Kerala', hi: 'केरल' }, alt: { en: 'Kollavarsham', hi: 'कोल्लवर्षम' },
    era: { label: { en: 'Kollam Era', hi: 'कोल्लम वर्ष' }, offset: -824, start: 4 },
    months: ['മേടം', 'ഇടവം', 'മിഥുനം', 'കർക്കടകം', 'ചിങ്ങം', 'കന്നി', 'തുലാം', 'വൃശ്ചികം', 'ധനു', 'മകരം', 'കുംഭം', 'മീനം'],
    monthsEn: ['Medam', 'Edavam', 'Mithunam', 'Karkidakam', 'Chingam', 'Kanni', 'Thulam', 'Vrischikam', 'Dhanu', 'Makaram', 'Kumbham', 'Meenam'],
    monthsHi: ['मेडम', 'इडवम', 'मिथुनम', 'कर्किडकम', 'चिंगम', 'कन्नी', 'तुलाम', 'वृश्चिकम', 'धनु', 'मकरम', 'कुंभम', 'मीनम'],
    wd: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
    tithi: ['പ്രഥമ', 'ദ്വിതീയ', 'തൃതീയ', 'ചതുർത്ഥി', 'പഞ്ചമി', 'ഷഷ്ഠി', 'സപ്തമി', 'അഷ്ടമി', 'നവമി', 'ദശമി', 'ഏകാദശി', 'ദ്വാദശി', 'ത്രയോദശി', 'ചതുർദശി', 'പൗർണമി'], amavasya: 'അമാവാസി', paksha: ['വെളുത്ത പക്ഷം', 'കറുത്ത പക്ഷം'],
    about: {
      en: 'The Malayalam calendar (Kollavarsham, the Kollam Era) is a solar calendar. A month begins when the Sun enters a sidereal sign, counted from the same day if that happens in the first three-fifths of daytime. The year begins on Chingam 1 in mid-August.',
      hi: 'मलयालम कैलेंडर (कोल्लवर्षम) सौर कैलेंडर है। सूर्य के निरयण राशि में प्रवेश से मास शुरू होता है; प्रवेश दिन के पहले तीन-पाँचवें भाग में हो तो वही दिन पहली तारीख है। वर्ष अगस्त के मध्य में चिंगम 1 से शुरू होता है।',
    },
  },
  {
    slug: 'bengali', name: { en: 'Bengali', hi: 'बंगाली' }, native: 'বাংলা ক্যালেন্ডার', tag: 'bn', kind: 'solar', style: 'next', city: 'kolkata', states: ['West Bengal', 'Tripura'],
    region: { en: 'West Bengal and Tripura', hi: 'पश्चिम बंगाल और त्रिपुरा' }, alt: { en: 'Bangla Panjika', hi: 'बांग्ला पंजिका' },
    era: { label: { en: 'Bangabda', hi: 'बंगाब्द' }, offset: -593, start: 0 },
    months: ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'],
    monthsEn: ['Boishakh', 'Joishtho', 'Asharh', 'Shrabon', 'Bhadro', 'Ashwin', 'Kartik', 'Ogrohayon', 'Poush', 'Magh', 'Falgun', 'Choitro'], monthsHi: BN_HI_MONTHS,
    wd: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    tithi: ['প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী', 'পূর্ণিমা'], amavasya: 'অমাবস্যা', paksha: ['শুক্ল', 'কৃষ্ণ'],
    about: {
      en: 'The Bengali calendar used in West Bengal (Bangabda, as in the traditional panjika) is a solar calendar: each month begins the day after the Sun enters a sidereal sign. The year begins on Poila Boishakh in mid-April. Bangladesh uses a revised fixed-date version that can differ by a day.',
      hi: 'पश्चिम बंगाल में प्रचलित बंगाली कैलेंडर (बंगाब्द, पारंपरिक पंजिका के अनुसार) सौर कैलेंडर है: सूर्य के निरयण राशि में प्रवेश के अगले दिन से मास शुरू होता है। वर्ष अप्रैल के मध्य में पोइला बैशाख से शुरू होता है। बांग्लादेश का संशोधित कैलेंडर एक दिन अलग हो सकता है।',
    },
  },
  {
    slug: 'odia', name: { en: 'Odia', hi: 'ओड़िया' }, native: 'ଓଡ଼ିଆ କ୍ୟାଲେଣ୍ଡର', tag: 'or', kind: 'solar', style: 'same', city: 'bhubaneswar', states: ['Odisha'],
    region: { en: 'Odisha', hi: 'ओडिशा' }, alt: { en: 'Odia Panji', hi: 'ओड़िया पांजि' },
    months: ['ବୈଶାଖ', 'ଜ୍ୟେଷ୍ଠ', 'ଆଷାଢ଼', 'ଶ୍ରାବଣ', 'ଭାଦ୍ରବ', 'ଆଶ୍ୱିନ', 'କାର୍ତ୍ତିକ', 'ମାର୍ଗଶିର', 'ପୌଷ', 'ମାଘ', 'ଫାଲ୍ଗୁନ', 'ଚୈତ୍ର'],
    monthsEn: ['Baisakha', 'Jyestha', 'Ashadha', 'Shrabana', 'Bhadraba', 'Ashwina', 'Kartika', 'Margasira', 'Pausha', 'Magha', 'Phalguna', 'Chaitra'],
    monthsHi: ['बैशाख', 'ज्येष्ठ', 'आषाढ़', 'श्रावण', 'भाद्रव', 'आश्विन', 'कार्तिक', 'मार्गशिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'],
    wd: ['ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'],
    tithi: ['ପ୍ରତିପଦା', 'ଦ୍ୱିତୀୟା', 'ତୃତୀୟା', 'ଚତୁର୍ଥୀ', 'ପଞ୍ଚମୀ', 'ଷଷ୍ଠୀ', 'ସପ୍ତମୀ', 'ଅଷ୍ଟମୀ', 'ନବମୀ', 'ଦଶମୀ', 'ଏକାଦଶୀ', 'ଦ୍ୱାଦଶୀ', 'ତ୍ରୟୋଦଶୀ', 'ଚତୁର୍ଦ୍ଦଶୀ', 'ପୂର୍ଣ୍ଣିମା'], amavasya: 'ଅମାବାସ୍ୟା', paksha: ['ଶୁକ୍ଳ', 'କୃଷ୍ଣ'],
    about: {
      en: 'The Odia calendar (Odia Panji) counts solar months from the day of the sankranti itself: the day the Sun enters a sidereal sign is the 1st of the month. The year begins on Pana Sankranti (Maha Bishuba Sankranti) in mid-April.',
      hi: 'ओड़िया कैलेंडर (ओड़िया पांजि) में सौर मास संक्रांति के दिन से ही गिना जाता है: जिस दिन सूर्य निरयण राशि में प्रवेश करता है वही पहली तारीख है। वर्ष अप्रैल के मध्य में पणा संक्रांति (महा विषुव संक्रांति) से शुरू होता है।',
    },
  },
  {
    slug: 'punjabi', name: { en: 'Punjabi', hi: 'पंजाबी' }, native: 'ਪੰਜਾਬੀ ਕੈਲੰਡਰ', tag: 'pa', kind: 'solar', style: 'same', city: 'amritsar', states: ['Punjab', 'Chandigarh', 'Haryana'],
    region: { en: 'Punjab', hi: 'पंजाब' }, alt: { en: 'Desi months, Sangrand dates', hi: 'देसी महीने, संग्रांद की तारीखें' },
    months: ['ਵੈਸਾਖ', 'ਜੇਠ', 'ਹਾੜ', 'ਸਾਵਣ', 'ਭਾਦੋਂ', 'ਅੱਸੂ', 'ਕੱਤਕ', 'ਮੱਘਰ', 'ਪੋਹ', 'ਮਾਘ', 'ਫੱਗਣ', 'ਚੇਤ'],
    monthsEn: ['Vaisakh', 'Jeth', 'Harh', 'Sawan', 'Bhadon', 'Assu', 'Kattak', 'Maghar', 'Poh', 'Magh', 'Phagun', 'Chet'],
    monthsHi: ['वैसाख', 'जेठ', 'हाड़', 'सावन', 'भादों', 'अस्सू', 'कत्तक', 'मघर', 'पोह', 'माघ', 'फग्गन', 'चेत'],
    wd: ['ਐਤਵਾਰ', 'ਸੋਮਵਾਰ', 'ਮੰਗਲਵਾਰ', 'ਬੁੱਧਵਾਰ', 'ਵੀਰਵਾਰ', 'ਸ਼ੁੱਕਰਵਾਰ', 'ਸ਼ਨੀਵਾਰ'],
    tithi: ['ਏਕਮ', 'ਦੂਜ', 'ਤੀਜ', 'ਚੌਥ', 'ਪੰਚਮੀ', 'ਛਠ', 'ਸਪਤਮੀ', 'ਅਸ਼ਟਮੀ', 'ਨੌਮੀ', 'ਦਸਮੀ', 'ਇਕਾਦਸ਼ੀ', 'ਦੁਆਦਸ਼ੀ', 'ਤ੍ਰਯੋਦਸ਼ੀ', 'ਚੌਦਸ', 'ਪੂਰਨਮਾਸ਼ੀ'], amavasya: 'ਮੱਸਿਆ', paksha: ['ਸੁਦੀ', 'ਵਦੀ'],
    about: {
      en: 'The Punjabi (Desi, Bikrami) calendar counts solar months from Sangrand, the day the Sun enters a sidereal sign; Vaisakhi is 1 Vaisakh. Puranmashi (full moon) and Massya (new moon) come from the lunar tithi. The fixed-date Nanakshahi calendar published for Sikh observances can differ by a day or two.',
      hi: 'पंजाबी (देसी, बिक्रमी) कैलेंडर में सौर मास संग्रांद से गिना जाता है, यानी जिस दिन सूर्य निरयण राशि में प्रवेश करता है; वैसाखी 1 वैसाख है। पूरनमाशी और मस्सिया चंद्र तिथि से आती हैं। सिख पर्वों के लिए छपने वाला नानकशाही कैलेंडर एक-दो दिन अलग हो सकता है।',
    },
  },
  {
    slug: 'assamese', name: { en: 'Assamese', hi: 'असमिया' }, native: 'অসমীয়া কেলেণ্ডাৰ', tag: 'as', kind: 'solar', style: 'next', city: 'guwahati', states: ['Assam'],
    region: { en: 'Assam', hi: 'असम' }, alt: { en: 'Assamese Panjika', hi: 'असमिया पंजिका' },
    era: { label: { en: 'Bhaskarabda', hi: 'भास्कराब्द' }, offset: -593, start: 0 },
    months: ['ব’হাগ', 'জেঠ', 'আহাৰ', 'শাওণ', 'ভাদ', 'আহিন', 'কাতি', 'আঘোণ', 'পুহ', 'মাঘ', 'ফাগুন', 'চ’ত'],
    monthsEn: ['Bohag', 'Jeth', 'Ahar', 'Shaon', 'Bhado', 'Ahin', 'Kati', 'Aghon', 'Puh', 'Magh', 'Phagun', 'Chot'],
    monthsHi: ['बोहाग', 'जेठ', 'आहार', 'शाओन', 'भाद', 'आहिन', 'काति', 'आघोन', 'पुह', 'माघ', 'फागुन', 'चोत'],
    wd: ['দেওবাৰ', 'সোমবাৰ', 'মঙ্গলবাৰ', 'বুধবাৰ', 'বৃহস্পতিবাৰ', 'শুক্ৰবাৰ', 'শনিবাৰ'],
    tithi: ['প্ৰতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুৰ্থী', 'পঞ্চমী', 'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নৱমী', 'দশমী', 'একাদশী', 'দ্বাদশী', 'ত্ৰয়োদশী', 'চতুৰ্দশী', 'পূৰ্ণিমা'], amavasya: 'অমাৱস্যা', paksha: ['শুক্ল', 'কৃষ্ণ'],
    about: {
      en: 'The Assamese calendar (Bhaskarabda) is a solar calendar: each month begins the day after the Sun enters a sidereal sign. The year begins on 1 Bohag, the main day of Rongali (Bohag) Bihu in mid-April.',
      hi: 'असमिया कैलेंडर (भास्कराब्द) सौर कैलेंडर है: सूर्य के निरयण राशि में प्रवेश के अगले दिन से मास शुरू होता है। वर्ष अप्रैल के मध्य में 1 बोहाग से शुरू होता है, जो रोंगाली (बोहाग) बिहू का मुख्य दिन है।',
    },
  },
  {
    slug: 'islamic', name: { en: 'Islamic', hi: 'इस्लामी' }, native: 'اسلامی کیلنڈر', tag: 'ur', kind: 'hijri', city: 'delhi', states: [],
    region: { en: 'India', hi: 'भारत' }, alt: { en: 'Hijri / Urdu calendar', hi: 'हिजरी / उर्दू कैलेंडर' },
    era: { label: { en: 'AH', hi: 'हिजरी' } },
    months: ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذوالقعدہ', 'ذوالحجہ'],
    monthsEn: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
    monthsHi: ['मुहर्रम', 'सफ़र', 'रबी अल-अव्वल', 'रबी अल-थानी', 'जमादी अल-अव्वल', 'जमादी अल-थानी', 'रजब', 'शाबान', 'रमज़ान', 'शव्वाल', 'ज़ु अल-क़ादा', 'ज़ु अल-हिज्जा'],
    wd: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
    about: {
      en: 'The Islamic (Hijri) calendar has 12 lunar months of 29 or 30 days, each starting when the new crescent is sighted. The dates here are predictions for India based on when the crescent should be visible; the actual start of each month is announced by local moon-sighting committees and can be a day later.',
      hi: 'इस्लामी (हिजरी) कैलेंडर में 29 या 30 दिन के 12 चंद्र मास होते हैं, जो नया चाँद दिखने पर शुरू होते हैं। यहाँ दी गई तारीखें भारत के लिए अनुमान हैं, इस आधार पर कि चाँद कब दिखना चाहिए; हर मास की असल शुरुआत स्थानीय चाँद कमेटियाँ घोषित करती हैं और एक दिन बाद हो सकती है।',
    },
  },
];

/* ---------------- Data ---------------- */
const tw = (cal, lang) => (cal.kind === 'hijri' ? L(lang, 'Dates', 'तारीखें') : L(lang, 'Tithi', 'तिथि'));
const calName = (cal, lang) => L(lang, `${cal.name.en} Calendar`, `${cal.name.hi} कैलेंडर`);
const calPath = cal => `/${cal.slug}-calendar/`;
const calYearPath = (cal, y) => `/${cal.slug}-calendar/${y}/`;
const calMonthPath = (cal, y, m) => `/${cal.slug}-calendar/${y}/${MONTH_EN[m].toLowerCase()}/`;
const cityOf = cal => C().cities.find(c => c.slug === cal.city) || C().cities[0];
const monthLabel = (cal, i, lang) => (lang === 'hi' ? (cal.monthsHi || (cal.kind === 'lunar' ? S.MONTHS_HI : cal.monthsEn)) : cal.monthsEn)[i];
const native = (cal, s) => `<span lang="${cal.tag}"${cal.tag === 'ur' ? ' dir="rtl"' : ''}>${esc(s)}</span>`;
const ymd = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// Per-day astronomy for a reference city (shared by every calendar that uses the city).
const dayCache = new Map();
function dayInfo(k, city) {
  const id = city.slug + k;
  if (!dayCache.has(id)) {
    const sr = S.sunrise(k, city);
    dayCache.set(id, {
      sr, T0: S.tithiAt(sr), nak: S.nakshatraAt(sr), angle: S.phaseAngle(S.istAt(k, 20)), rise: S.moonriseWithinDay(k, city),
      lm: C().months.find(m => m.start <= sr && sr < m.end),
    });
  }
  return dayCache.get(id);
}

// Lunar year: the Gregorian year in which the year-starting month (Chaitra, or Kartika for Gujarat) began.
const lunarYearCache = new Map();
function lunarYearOf(lm, startIdx) {
  if (!lunarYearCache.has(startIdx)) {
    const map = new Map();
    let cur = null;
    for (const m of C().months) { if (m.index === startIdx && !m.adhika) cur = Number(S.dayKey(m.start).slice(0, 4)); map.set(m, cur); }
    const first = [...map.values()].find(v => v !== null);
    for (const [m, v] of map) if (v === null) map.set(m, first - 1);
    lunarYearCache.set(startIdx, map);
  }
  return lunarYearCache.get(startIdx).get(lm);
}

// Solar months for a regional day-1 rule: [{ sign, day1, sankranti, year }]
const solarCache = new Map();
function solarMonths(cal) {
  const id = cal.style + (cal.era ? cal.era.start : '');
  if (solarCache.has(id)) return solarCache.get(id);
  const [y0, y1] = C().years;
  const end = new Date(S.istMidnight(`${y1}-12-31`).getTime() + 45 * S.DAY_MS);
  let t = new Date(S.istMidnight(`${y0}-01-01`).getTime() - 45 * S.DAY_MS);
  const out = [];
  while (t < end) {
    const sign = (S.sunSign(t) + 1) % 12;
    const sk = S.sankranti(sign, t);
    const k = S.dayKey(sk);
    const day1 = cal.style === 'same' ? k : cal.style === 'next' ? S.addDays(k, 1) : S.solarMonthStart(sign, t, cal.style).day1;
    out.push({ sign, day1, sankranti: sk });
    t = new Date(sk.getTime() + 2 * S.DAY_MS);
  }
  const start = cal.era ? cal.era.start : 0;
  let cur = null;
  for (const m of out) { if (m.sign === start) cur = Number(m.day1.slice(0, 4)); m.year = cur; }
  const first = out.find(m => m.year !== null);
  for (const m of out) if (m.year === null) m.year = first.year - 1;
  out.forEach((m, i) => { m.days = out[i + 1] ? Math.round((Date.parse(out[i + 1].day1) - Date.parse(m.day1)) / S.DAY_MS) : null; });
  solarCache.set(id, out);
  return out;
}

// Predicted Hijri months for India: [{ month (0..11), day1, year, days }]
let hijriCache = null;
function hijriMonths() {
  if (hijriCache) return hijriCache;
  const [y0, y1] = C().years;
  const from = new Date(S.istMidnight(`${y0}-01-01`).getTime() - 45 * S.DAY_MS), to = new Date(S.istMidnight(`${y1}-12-31`).getTime() + 45 * S.DAY_MS);
  const seen = new Set(), out = [];
  for (let M = 1; M <= 12; M++) for (const s of S.islamicMonthStarts(M, from, to)) {
    if (seen.has(s.day1)) continue;
    seen.add(s.day1); out.push({ month: M - 1, day1: s.day1, year: s.hijriYear });
  }
  out.sort((a, b) => (a.day1 < b.day1 ? -1 : 1));
  out.forEach((m, i) => { m.days = out[i + 1] ? Math.round((Date.parse(out[i + 1].day1) - Date.parse(m.day1)) / S.DAY_MS) : null; });
  hijriCache = out;
  return out;
}
const lastBefore = (list, k) => { let r = null; for (const m of list) { if (m.day1 <= k) r = m; else break; } return r; };

// The regional date of civil day k.
function regionalDate(cal, k) {
  const info = dayInfo(k, cityOf(cal));
  const r = { info, T0: info.T0 };
  if (cal.kind === 'lunar') {
    const lm = info.lm;
    r.adhika = lm.adhika;
    r.month = cal.scheme === 'purnimanta' && !lm.adhika && info.T0 > 15 ? (lm.index + 1) % 12 : lm.index;
    r.gYear = lunarYearOf(lm, cal.era.start);
  } else if (cal.kind === 'solar') {
    const sm = lastBefore(solarMonths(cal), k);
    r.month = sm.sign; r.day = Math.round((Date.parse(k) - Date.parse(sm.day1)) / S.DAY_MS) + 1; r.gYear = sm.year;
  } else {
    const hm = lastBefore(hijriMonths(), k);
    r.month = hm.month; r.day = Math.round((Date.parse(k) - Date.parse(hm.day1)) / S.DAY_MS) + 1; r.hYear = hm.year;
  }
  return r;
}
const tithiNative = (cal, T0) => (cal.tithi ? (T0 === 30 ? cal.amavasya : cal.tithi[(T0 - 1) % 15]) : '');
const pakshaNative = (cal, T0) => (cal.paksha ? cal.paksha[T0 <= 15 ? 0 : 1] : '');
const adhikaTxt = (r, lang) => (r.adhika ? ` (${T[lang].adhika})` : '');
// "Kartika Shukla Dwitiya" / "5 Thai" in the page language
function dateText(cal, r, lang) {
  if (cal.kind === 'lunar') return `${monthLabel(cal, r.month, lang)}${adhikaTxt(r, lang)} ${pakshaName(r.T0, lang)} ${tithiName(r.T0, lang)}`;
  return `${r.day} ${monthLabel(cal, r.month, lang)}`;
}
// The same in the calendar's own script (HTML)
function dateNative(cal, r) {
  if (cal.kind === 'lunar') return native(cal, `${cal.months[r.month]} ${pakshaNative(cal, r.T0)} ${tithiNative(cal, r.T0)}`);
  return native(cal, `${cal.months[r.month]} ${r.day}`);
}
function eraText(cal, r, lang) {
  const parts = [];
  if (cal.kind === 'hijri') parts.push(`${r.hYear} ${cal.era.label[lang] || cal.era.label.en}`);
  else if (cal.era && cal.era.label) parts.push(`${cal.era.label[lang] || cal.era.label.en} ${r.gYear + cal.era.offset}`);
  if (cal.samv) parts.push(`${SAMVATSARA[((r.gYear - 1987) % 60 + 60) % 60]} ${L(lang, 'samvatsara', 'संवत्सर')}`);
  return parts.join(' · ');
}

// Festivals shown on a calendar: all-India ones plus those observed in the calendar's states (Islamic calendar: Islamic only).
const festCache = new Map();
function festMap(cal, lang) {
  const id = cal.slug + lang;
  if (festCache.has(id)) return festCache.get(id);
  const by = {};
  for (const f of C().festivals) {
    if (f.series === 'chandra-darshan') continue;
    if (cal.kind === 'hijri' ? f.type !== 'islamic' : (f.states && !f.states.some(s => cal.states.includes(s)))) continue;
    for (const o of C().occ[f.slug] || []) {
      const k = o.holiKey || o.key;
      (by[k] = by[k] || []).push({ label: P.occLabel(f, o, lang), href: url(lang, P.fpath(f)), series: f.series });
    }
  }
  // A plain "Purnima"/"Amavasya" entry is dropped when a named festival falls on the same day.
  for (const k of Object.keys(by)) if (by[k].some(x => !x.series)) by[k] = by[k].filter(x => x.series !== 'purnima' && x.series !== 'amavasya');
  festCache.set(id, by);
  return by;
}
const festLinks = list => list.map(x => `<a href="${x.href}">${esc(x.label)}</a>`).join(', ');

/* ---------------- Page pieces ---------------- */
function monthGrid(cal, y, m, lang) {
  const nDays = new Date(Date.UTC(Number(y), m + 1, 0)).getUTCDate();
  const fm = festMap(cal, lang);
  let cells = Array.from({ length: S.weekday(ymd(y, m, 1)) }, () => '<div class="c blank"></div>').join('');
  const rows = [], names = [];
  for (let d = 1; d <= nDays; d++) {
    const k = ymd(y, m, d), r = regionalDate(cal, k), fs = fm[k] || [];
    const mn = monthLabel(cal, r.month, lang);
    if (!names.includes(mn)) names.push(mn);
    const line1 = cal.kind === 'lunar' ? native(cal, tithiNative(cal, r.T0)) : native(cal, `${cal.months[r.month]} ${r.day}`);
    const line2 = cal.kind === 'lunar' ? native(cal, pakshaNative(cal, r.T0)) : cal.tithi ? native(cal, tithiNative(cal, r.T0)) : esc(tithiName(r.T0, lang));
    cells += `<div class="c${k === C().today ? ' today' : ''}"><div class="n">${d}</div>${moonSvg(r.info.angle, { size: 30, cls: '', id: 'd' + d })}<div class="tt">${line1}</div><div class="tt muted">${line2}</div>${fs.length ? `<div class="fdot" title="${esc(fs.map(x => x.label).join(', '))}"></div><div class="tt" style="color:var(--accent);font-weight:600">${esc(fs.map(x => x.label).join(', '))}</div>` : ''}</div>`;
    rows.push(`<tr${k === C().today ? ' class="hl"' : ''}><td>${esc(fmtDate(k, lang, { year: false, weekday: false }))}<br><span class="muted small">${native(cal, cal.wd[S.weekday(k)])}</span></td><td>${dateNative(cal, r)}<br><span class="muted small">${esc(dateText(cal, r, lang))}</span></td><td>${cal.kind === 'lunar' ? '' : esc(pakshaName(r.T0, lang)) + ' '}${cal.kind === 'lunar' ? esc((lang === 'hi' ? P.NAK_HI : P.NAK_EN)[r.info.nak]) : esc(tithiName(r.T0, lang)) + '<br><span class="muted small">' + esc((lang === 'hi' ? P.NAK_HI : P.NAK_EN)[r.info.nak]) + '</span>'}</td><td class="t">${esc(fmtTime(r.info.rise, lang))}</td><td>${festLinks(fs)}</td></tr>`);
  }
  const wd = cal.wd.map(w => `<div class="h">${native(cal, w)}</div>`).join('');
  return { grid: `<div class="mgrid rgrid">${wd}${cells}</div>`, rows, names, first: regionalDate(cal, ymd(y, m, 1)), last: regionalDate(cal, ymd(y, m, nDays)) };
}
function dayTable(cal, g, lang) {
  const cn = P.nm(cityOf(cal).name, lang);
  return `<div class="table-wrap"><table><thead><tr><th>${esc(T[lang].date)}</th><th>${esc(calName(cal, lang))}</th><th>${cal.kind === 'lunar' ? L(lang, 'Nakshatra', 'नक्षत्र') : L(lang, 'Tithi · Nakshatra', 'तिथि · नक्षत्र')}</th><th>${esc(T[lang].moonrise)} (${esc(cn)})</th><th>${esc(T[lang].navFestivals)}</th></tr></thead><tbody>${g.rows.join('')}</tbody></table></div>`;
}
const otherCals = (cal, lang) => `<section class="section"><h2>${L(lang, 'Calendars of other states and languages', 'अन्य राज्यों और भाषाओं के कैलेंडर')}</h2><div class="pills">${CALS.filter(c => c !== cal).map(c => `<a href="${url(lang, calPath(c))}">${esc(calName(c, lang))}</a>`).join('')}</div></section>`;
const monthPills = (cal, y, lang) => `<div class="pills">${C().monthList.filter(([a]) => a === y).map(([a, b]) => `<a href="${url(lang, calMonthPath(cal, a, b))}">${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[b])} ${a}</a>`).join('')}</div>`;
const noteText = (cal, lang) => {
  const cn = P.nm(cityOf(cal).name, lang);
  return cal.kind === 'hijri'
    ? L(lang, 'Predicted dates for India. Each Islamic day begins at sunset on the evening before the date shown. Follow your local moon-sighting committee for the confirmed date.', 'भारत के लिए अनुमानित तारीखें। हर इस्लामी दिन, दिखाई गई तारीख से पहले की शाम सूर्यास्त पर शुरू होता है। पक्की तारीख के लिए स्थानीय चाँद कमेटी की घोषणा देखें।')
    : L(lang, `Tithi and nakshatra are those running at sunrise in ${cn}; the moon shape is for 8 PM. Printed almanacs can differ by a day where a tithi or sankranti falls close to the cut-off, so check your local panchang for important dates.`, `तिथि और नक्षत्र ${cn} में सूर्योदय के समय के हैं; चाँद का आकार रात 8 बजे का है। जहाँ तिथि या संक्रांति सीमा के पास पड़ती है, वहाँ छपे पंचांग में एक दिन का अंतर हो सकता है, इसलिए ज़रूरी तारीखों के लिए स्थानीय पंचांग देखें।`);
};
function faqs(cal, lang) {
  const n = cal.name[lang] || cal.name.en, k = C().today, r = regionalDate(cal, k), era = eraText(cal, r, lang);
  const today = `${dateText(cal, r, lang)}${era ? ', ' + era : ''}`;
  const out = [[L(lang, `What is today's date in the ${n} calendar?`, `${n} कैलेंडर में आज की तारीख क्या है?`), L(lang, `Today, ${fmtDate(k, 'en')}, is ${today}. This page is updated every morning.`, `आज, ${fmtDate(k, 'hi')}, ${today} है। यह पेज हर सुबह अपडेट होता है।`)]];
  if (cal.kind === 'lunar') out.push([L(lang, `Does the ${n} calendar end its months on Amavasya or Purnima?`, `${n} कैलेंडर में मास अमावस्या पर समाप्त होता है या पूर्णिमा पर?`), cal.scheme === 'amanta'
    ? L(lang, 'On Amavasya (the Amanta system): the month starts the day after the new moon, with the bright half first.', 'अमावस्या पर (अमांत पद्धति): मास अमावस्या के अगले दिन शुरू होता है और पहले शुक्ल पक्ष आता है।')
    : L(lang, 'On Purnima (the Purnimanta system): the month starts the day after the full moon, with the dark half first.', 'पूर्णिमा पर (पूर्णिमांत पद्धति): मास पूर्णिमा के अगले दिन शुरू होता है और पहले कृष्ण पक्ष आता है।')]);
  if (cal.kind === 'solar') out.push([L(lang, `Why do ${n} months not start on the same English date every year?`, `${n} महीने हर साल एक ही अंग्रेज़ी तारीख को क्यों शुरू नहीं होते?`), L(lang, 'Each month starts when the Sun enters a new sidereal zodiac sign (sankranti). That moment shifts by a few hours every year, so the first day can move by one day.', 'हर मास तब शुरू होता है जब सूर्य नई निरयण राशि में प्रवेश करता है (संक्रांति)। यह क्षण हर साल कुछ घंटे खिसकता है, इसलिए पहली तारीख एक दिन आगे-पीछे हो सकती है।')]);
  out.push([L(lang, `How accurate is this ${n} calendar?`, `यह ${n} कैलेंडर कितना सटीक है?`), noteText(cal, lang)]);
  return out;
}

/* ---------------- Pages ---------------- */
function monthPage(cal, y, m, lang) {
  const t = T[lang], mName = (lang === 'hi' ? MONTH_HI : MONTH_EN)[m], g = monthGrid(cal, y, m, lang), cn = P.nm(cityOf(cal).name, lang);
  const era = [...new Set([eraText(cal, g.first, lang), eraText(cal, g.last, lang)])].filter(Boolean).join(' / ');
  const span = g.names.join(' – ');
  const prev = m === 0 ? [String(Number(y) - 1), 11] : [y, m - 1], next = m === 11 ? [String(Number(y) + 1), 0] : [y, m + 1];
  const inRange = (yy, mm) => C().monthList.some(([a, b]) => a === yy && b === mm);
  const crumbs = breadcrumbs([[t.navCalendar, url(lang, '/calendar/')], [calName(cal, lang), url(lang, calPath(cal))], [y, url(lang, calYearPath(cal, y))], [mName]]);
  let body = P.hero({ lang, crumbs, eyebrow: `${cal.native} · ${era || cal.alt[lang]}`, h1: `${calName(cal, lang)} ${mName} ${y}`, sub: L(lang, `${span} · tithi, nakshatra and festivals of ${cal.region.en}`, `${span} · तिथि, नक्षत्र और ${cal.region.hi} के त्योहार`), angle: S.phaseAngle(S.istAt(ymd(y, m, 1), 20)) });
  body += `<div class="wrap">${adSlot()}
<div class="btn-row">${inRange(...prev) ? `<a class="btn ghost" href="${url(lang, calMonthPath(cal, ...prev))}">← ${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[prev[1]])}</a>` : ''}${inRange(...next) ? `<a class="btn ghost" href="${url(lang, calMonthPath(cal, ...next))}">${esc((lang === 'hi' ? MONTH_HI : MONTH_EN)[next[1]])} →</a>` : ''}</div>
${g.grid}
<section class="section"><h2>${L(lang, `${cal.name.en} calendar ${mName} ${y}: day by day`, `${cal.name.hi} कैलेंडर ${mName} ${y}: हर दिन`)}</h2>${dayTable(cal, g, lang)}
<p class="muted small" style="margin-top:10px">${esc(noteText(cal, lang))}</p></section>
${adSlot()}
<section class="section"><h2>${esc(calName(cal, lang))} ${y}</h2>${monthPills(cal, y, lang)}</section>
<section class="section prose"><h2>${L(lang, `About the ${cal.name.en} calendar`, `${cal.name.hi} कैलेंडर के बारे में`)}</h2><p>${esc(cal.about[lang])}</p></section>
${otherCals(cal, lang)}</div>`;
  return page({
    lang, path: calMonthPath(cal, y, m), body, navActive: 'calendar',
    title: L(lang, `${cal.name.en} Calendar ${mName} ${y} – ${cal.native}: ${tw(cal, lang)} & Festivals`, `${cal.name.hi} कैलेंडर ${mName} ${y} – ${cal.native}: ${tw(cal, lang)} और त्योहार`),
    desc: L(lang, `${cal.name.en} calendar for ${mName} ${y} (${span}${era ? ', ' + era : ''}): the ${cal.name.en} date, tithi and nakshatra for every day, moonrise in ${cn} and festivals of ${cal.region.en}.`, `${mName} ${y} का ${cal.name.hi} कैलेंडर (${span}${era ? ', ' + era : ''}): हर दिन की ${cal.name.hi} तारीख, तिथि और नक्षत्र, ${cn} में चंद्रोदय और ${cal.region.hi} के त्योहार।`),
  });
}

// Regional months that touch Gregorian year y
function yearMonthsTable(cal, y, lang) {
  const t = T[lang], a = `${y}-01-01`, b = `${y}-12-31`;
  if (cal.kind === 'lunar') {
    const list = C().months.filter(m => S.dayKey(m.end) >= a && S.dayKey(m.start) <= b);
    return `<div class="table-wrap"><table><thead><tr><th>${L(lang, 'Month', 'मास')}</th><th>${L(lang, 'Amavasya (new moon before it)', 'अमावस्या (मास से पहले)')}</th><th>${L(lang, 'Purnima (full moon)', 'पूर्णिमा')}</th></tr></thead><tbody>${list.map(m => `<tr><td>${native(cal, cal.months[m.index])}<br><span class="muted small">${esc(monthLabel(cal, m.index, lang))}${m.adhika ? ` (${t.adhika})` : ''}</span></td><td>${esc(fmtDateTime(m.start, lang))}</td><td>${esc(fmtDateTime(m.tithi[15], lang))}</td></tr>`).join('')}</tbody></table></div>
<p class="muted small" style="margin-top:10px">${cal.scheme === 'amanta' ? L(lang, 'Each month runs from the day after the Amavasya shown to the next Amavasya.', 'हर मास दिखाई गई अमावस्या के अगले दिन से अगली अमावस्या तक चलता है।') : L(lang, 'In the Purnimanta system each month ends on the Purnima shown; its dark half begins the day after the previous Purnima.', 'पूर्णिमांत पद्धति में हर मास दिखाई गई पूर्णिमा पर समाप्त होता है; उसका कृष्ण पक्ष पिछली पूर्णिमा के अगले दिन से शुरू होता है।')}</p>`;
  }
  const list = (cal.kind === 'solar' ? solarMonths(cal) : hijriMonths()).filter(m => m.day1 >= S.addDays(a, -31) && m.day1 <= b);
  const idx = m => (cal.kind === 'solar' ? m.sign : m.month);
  return `<div class="table-wrap"><table><thead><tr><th>${L(lang, 'Month', 'मास')}</th><th>${L(lang, 'First day', 'पहली तारीख')}</th><th>${L(lang, 'Days', 'दिन')}</th>${cal.kind === 'solar' ? `<th>${L(lang, 'Sankranti', 'संक्रांति')}</th>` : ''}</tr></thead><tbody>${list.map(m => `<tr><td>${native(cal, cal.months[idx(m)])}<br><span class="muted small">${esc(monthLabel(cal, idx(m), lang))}</span></td><td>${esc(fmtDate(m.day1, lang))}</td><td>${m.days || '—'}</td>${cal.kind === 'solar' ? `<td>${esc(fmtDateTime(m.sankranti, lang))}</td>` : ''}</tr>`).join('')}</tbody></table></div>`;
}
function yearFestivals(cal, y, lang) {
  const fm = festMap(cal, lang);
  const keys = Object.keys(fm).filter(k => k.startsWith(y) && fm[k].some(x => !x.series)).sort();
  if (!keys.length) return '';
  return `<section class="section"><h2>${L(lang, `Festivals in the ${cal.name.en} calendar ${y}`, `${cal.name.hi} कैलेंडर ${y} के त्योहार`)}</h2><div class="table-wrap"><table><thead><tr><th>${esc(T[lang].date)}</th><th>${esc(calName(cal, lang))}</th><th>${esc(T[lang].navFestivals)}</th></tr></thead><tbody>${keys.map(k => { const r = regionalDate(cal, k); return `<tr${k === C().today ? ' class="hl"' : ''}><td>${esc(fmtDate(k, lang, { year: false }))}</td><td>${dateNative(cal, r)}<br><span class="muted small">${esc(dateText(cal, r, lang))}</span></td><td>${festLinks(fm[k].filter(x => !x.series))}</td></tr>`; }).join('')}</tbody></table></div></section>`;
}

function yearPage(cal, y, lang) {
  const t = T[lang];
  const crumbs = breadcrumbs([[t.navCalendar, url(lang, '/calendar/')], [calName(cal, lang), url(lang, calPath(cal))], [y]]);
  const e1 = eraText(cal, regionalDate(cal, `${y}-01-01`), lang), e2 = eraText(cal, regionalDate(cal, `${y}-12-31`), lang);
  const era = [...new Set([e1, e2])].filter(Boolean).join(' / ');
  let body = P.hero({ lang, crumbs, eyebrow: `${cal.native} · ${cal.alt[lang]}`, h1: `${calName(cal, lang)} ${y}`, sub: era, angle: 180 });
  body += `<div class="wrap">${adSlot()}
<section class="section"><h2>${L(lang, `${cal.name.en} calendar ${y}: month by month`, `${cal.name.hi} कैलेंडर ${y}: हर महीना`)}</h2>${monthPills(cal, y, lang)}</section>
<section class="section"><h2>${L(lang, `${cal.name.en} months in ${y}`, `${y} के ${cal.name.hi} मास`)}</h2>${yearMonthsTable(cal, y, lang)}</section>
${yearFestivals(cal, y, lang)}
${adSlot()}
<section class="section prose"><h2>${L(lang, `About the ${cal.name.en} calendar`, `${cal.name.hi} कैलेंडर के बारे में`)}</h2><p>${esc(cal.about[lang])}</p><p class="muted small">${esc(noteText(cal, lang))}</p></section>
<section class="section"><div class="pills">${C().years.filter(x => x !== y).map(x => `<a href="${url(lang, calYearPath(cal, x))}">${esc(calName(cal, lang))} ${x}</a>`).join('')}</div></section>
${otherCals(cal, lang)}</div>`;
  return page({
    lang, path: calYearPath(cal, y), body, navActive: 'calendar',
    title: L(lang, `${cal.name.en} Calendar ${y} – ${cal.native}: Months, ${tw(cal, lang)} & Festivals`, `${cal.name.hi} कैलेंडर ${y} – ${cal.native}: मास, ${tw(cal, lang)} और त्योहार`),
    desc: L(lang, `${cal.name.en} calendar ${y}${era ? ' (' + era + ')' : ''}: start date of every ${cal.name.en} month, festival dates and a day-by-day calendar with tithi and nakshatra for all 12 months.`, `${cal.name.hi} कैलेंडर ${y}${era ? ' (' + era + ')' : ''}: हर ${cal.name.hi} मास की शुरुआत, त्योहारों की तारीखें और सभी 12 महीनों का तिथि-नक्षत्र सहित दैनिक कैलेंडर।`),
  });
}

function hubPage(cal, lang) {
  const t = T[lang], k = C().today, y = k.slice(0, 4), m = Number(k.slice(5, 7)) - 1;
  const r = regionalDate(cal, k), g = monthGrid(cal, y, m, lang), cn = P.nm(cityOf(cal).name, lang), mName = (lang === 'hi' ? MONTH_HI : MONTH_EN)[m];
  const era = eraText(cal, r, lang);
  const crumbs = breadcrumbs([[t.navToday, url(lang, '/')], [t.navCalendar, url(lang, '/calendar/')], [calName(cal, lang)]]);
  const meta = [era, `${L(lang, 'Tithi', 'तिथि')}: ${pakshaName(r.T0, lang)} ${tithiName(r.T0, lang)} · ${L(lang, 'Nakshatra', 'नक्षत्र')}: ${(lang === 'hi' ? P.NAK_HI : P.NAK_EN)[r.info.nak]}`, `${t.sunrise} ${fmtTime(r.info.sr, lang)} · ${t.moonrise} ${fmtTime(r.info.rise, lang)} (${cn})`];
  const A = { label: L(lang, `Today in the ${cal.name.en} calendar`, `${cal.name.hi} कैलेंडर में आज`), big: dateText(cal, r, lang), date: fmtDate(k, lang), meta, target: null };
  const f = faqs(cal, lang);
  let body = P.hero({ lang, crumbs, eyebrow: `${cal.native} · ${cal.alt[lang]}`, h1: `${calName(cal, lang)} ${y}`, sub: L(lang, `Today's ${cal.name.en} date, tithi and festivals of ${cal.region.en}`, `आज की ${cal.name.hi} तारीख, तिथि और ${cal.region.hi} के त्योहार`), A, angle: r.info.angle });
  body += `<div class="wrap">${adSlot()}
<section class="section"><h2>${esc(calName(cal, lang))} ${esc(mName)} ${y}</h2>${g.grid}<p style="margin-top:12px"><a href="${url(lang, calMonthPath(cal, y, m))}">${L(lang, `${mName} ${y}: full day-by-day list`, `${mName} ${y}: हर दिन की पूरी सूची`)} →</a></p></section>
${C().years.map(yy => `<section class="section"><h2><a href="${url(lang, calYearPath(cal, yy))}">${esc(calName(cal, lang))} ${yy}</a></h2>${monthPills(cal, yy, lang)}</section>`).join('')}
${adSlot()}
<section class="section prose"><h2>${L(lang, `About the ${cal.name.en} calendar`, `${cal.name.hi} कैलेंडर के बारे में`)}</h2><p class="lead">${esc(cal.about[lang])}</p></section>
<section class="section"><h2>${esc(t.faqs)}</h2>${faqHtml(f)}</section>
${otherCals(cal, lang)}</div>`;
  return page({
    lang, path: calPath(cal), body, navActive: 'calendar', ld: [faqLd(f)],
    title: L(lang, `${cal.slug === 'hindi' ? 'Hindu Calendar ' + y + ' (Hindi Panchang)' : cal.name.en + ' Calendar ' + y} – ${cal.native}: Today's ${cal.kind === 'hijri' ? 'Date' : 'Tithi'} & Festivals`, `${cal.name.hi} कैलेंडर ${y} – ${cal.native}: आज की ${cal.kind === 'hijri' ? 'तारीख' : 'तिथि'} और त्योहार`),
    desc: L(lang, `${cal.name.en} calendar ${y} (${cal.alt.en}): today is ${dateText(cal, r, 'en')}${era ? ', ' + era : ''}. Monthly calendars with tithi, nakshatra and ${cal.region.en} festivals.`, `${cal.name.hi} कैलेंडर ${y} (${cal.alt.hi}): आज ${dateText(cal, r, 'hi')}${era ? ', ' + era : ''} है। तिथि, नक्षत्र और ${cal.region.hi} के त्योहारों सहित मासिक कैलेंडर।`),
  });
}

// Links for the calendar index and home page
const calLinks = lang => `<div class="pills">${CALS.map(c => `<a href="${url(lang, calPath(c))}">${esc(calName(c, lang))} <span lang="${c.tag}" class="muted small">${esc(c.native)}</span></a>`).join('')}</div>`;

module.exports = { CALS, hubPage, yearPage, monthPage, calPath, calYearPath, calMonthPath, calLinks, regionalDate, solarMonths, hijriMonths, dateText, eraText };
