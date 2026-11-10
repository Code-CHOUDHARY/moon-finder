// Festival definitions and content (English + Hindi).
// month = Amanta lunar month index (0 Chaitra … 11 Phalguna); tithi 1–15 Shukla (15 = Purnima), 16–30 Krishna (30 = Amavasya).
// rule = instant used to decide which civil day the tithi "prevails" on (see astro.pickDay).
// key = which moon time matters most on the day.
'use strict';

const F = [];
const add = f => F.push(f);

/* ========================= Highest priority ========================= */
add({
  slug: 'karva-chauth', states: ['Delhi', 'Punjab', 'Haryana', 'Chandigarh', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu and Kashmir', 'Madhya Pradesh'], type: 'hindu', month: 6, tithi: 19, rule: 'moonrise', key: 'moonrise', skin: 'karva', priority: 1,
  name: { en: 'Karva Chauth', hi: 'करवा चौथ' },
  lunar: { en: 'Kartik Krishna Chaturthi (Purnimanta)', hi: 'कार्तिक कृष्ण चतुर्थी (पूर्णिमांत)' },
  intro: {
    en: 'Karva Chauth is a day-long fast kept by married women, mainly in North India, for the long life and well-being of their husbands. The fast runs from sunrise until the moon rises, so the moonrise time in your city is the most important number of the day.',
    hi: 'करवा चौथ पर विवाहित महिलाएँ, मुख्य रूप से उत्तर भारत में, पति की लंबी आयु और सुख के लिए दिन भर का निर्जला व्रत रखती हैं। व्रत सूर्योदय से चाँद निकलने तक चलता है, इसलिए आपके शहर में चंद्रोदय का समय इस दिन की सबसे ज़रूरी जानकारी है।',
  },
  rituals: {
    en: ['Sargi (a pre-dawn meal from the mother-in-law) is eaten before sunrise.', 'Women gather in the evening for the Karva Chauth katha and puja with a karva (clay pot).', 'After moonrise, the moon is seen through a sieve (chalni), arghya (water) is offered, and the husband\'s face is seen through the same sieve.', 'The fast is broken with water and food offered by the husband.'],
    hi: ['सूर्योदय से पहले सास द्वारा दी गई सरगी खाई जाती है।', 'शाम को महिलाएँ करवा (मिट्टी का घड़ा) के साथ करवा चौथ की कथा और पूजा करती हैं।', 'चाँद निकलने के बाद छलनी से चाँद देखकर अर्घ्य दिया जाता है और उसी छलनी से पति का चेहरा देखा जाता है।', 'पति के हाथ से पानी पीकर और भोजन ग्रहण करके व्रत खोला जाता है।'],
  },
  faqs: {
    en: [['What time will the moon rise on Karva Chauth?', 'It depends on your city. Pick your city above for the exact time. Eastern cities see the moon earlier than western ones, often by 30–60 minutes.'], ['Why can\'t I see the moon at the moonrise time?', 'Moonrise is when the moon crosses the flat horizon. Buildings, trees, haze or clouds can hide it for another 10–30 minutes, so look low in the east.'], ['Can I break the fast if it is cloudy?', 'Many families break the fast at the calculated moonrise time, or after seeing the moon on a video call from another city. Follow your family tradition.']],
    hi: [['करवा चौथ पर चाँद कितने बजे निकलेगा?', 'यह आपके शहर पर निर्भर है। ऊपर अपना शहर चुनें। पूर्वी शहरों में चाँद पश्चिमी शहरों से 30–60 मिनट पहले दिख सकता है।'], ['चंद्रोदय के समय चाँद क्यों नहीं दिखता?', 'चंद्रोदय का समय समतल क्षितिज के हिसाब से होता है। इमारतें, पेड़, धुंध या बादल 10–30 मिनट तक चाँद को छिपा सकते हैं, इसलिए पूर्व दिशा में नीचे की ओर देखें।'], ['बादल हों तो व्रत कैसे खोलें?', 'कई परिवार गणना किए गए चंद्रोदय समय पर या किसी दूसरे शहर से वीडियो कॉल पर चाँद देखकर व्रत खोलते हैं। अपनी पारिवारिक परंपरा का पालन करें।']],
  },
});

add({
  slug: 'sankashti-chaturthi', type: 'series', series: 'sankashti', tithi: 19, rule: 'moonrise', key: 'moonrise', skin: 'ganesh', priority: 1,
  name: { en: 'Sankashti Chaturthi', hi: 'संकष्टी चतुर्थी' },
  lunar: { en: 'Krishna Chaturthi, every month', hi: 'हर माह की कृष्ण चतुर्थी' },
  intro: {
    en: 'Sankashti Chaturthi is a monthly fast for Lord Ganesha, kept on the fourth day after the full moon. Devotees fast through the day and end it after seeing the moon, so moonrise time decides when the fast ends. When it falls on a Tuesday it is called Angaraki Chaturthi and is considered especially auspicious.',
    hi: 'संकष्टी चतुर्थी भगवान गणेश का मासिक व्रत है, जो पूर्णिमा के बाद चौथे दिन रखा जाता है। भक्त दिन भर उपवास करते हैं और चाँद देखकर व्रत खोलते हैं, इसलिए चंद्रोदय का समय सबसे महत्वपूर्ण है। मंगलवार को पड़ने पर इसे अंगारकी चतुर्थी कहते हैं, जिसे विशेष शुभ माना जाता है।',
  },
  rituals: {
    en: ['Fast from sunrise, with fruit or a simple meal if your tradition allows.', 'Evening Ganesh puja with durva grass and modak or laddoo.', 'Offer arghya to the moon after moonrise, then break the fast.'],
    hi: ['सूर्योदय से व्रत, परंपरा के अनुसार फलाहार।', 'शाम को दूर्वा और मोदक या लड्डू के साथ गणेश पूजा।', 'चंद्रोदय के बाद चंद्रमा को अर्घ्य देकर व्रत खोलें।'],
  },
  faqs: {
    en: [['When is the next Sankashti Chaturthi?', 'See the date at the top of this page. The full list for the year is below.'], ['What is Angaraki Chaturthi?', 'A Sankashti Chaturthi that falls on a Tuesday (Mangalvar). It comes a few times a year.']],
    hi: [['अगली संकष्टी चतुर्थी कब है?', 'तारीख इस पेज के ऊपर दी है। पूरे साल की सूची नीचे है।'], ['अंगारकी चतुर्थी क्या है?', 'मंगलवार को पड़ने वाली संकष्टी चतुर्थी। यह साल में कुछ ही बार आती है।']],
  },
});

add({
  slug: 'chandra-grahan', type: 'eclipse', key: 'eclipse', skin: 'grahan', priority: 1,
  name: { en: 'Chandra Grahan (Lunar Eclipse)', hi: 'चंद्र ग्रहण' },
  lunar: { en: 'Always on a Purnima (full moon)', hi: 'हमेशा पूर्णिमा पर' },
  intro: {
    en: 'A lunar eclipse happens when the Earth passes between the Sun and the Moon, and the Earth\'s shadow falls on the full moon. It is safe to watch with the naked eye. Whether you can see it depends on whether the moon is above the horizon in your city during the eclipse.',
    hi: 'चंद्र ग्रहण तब होता है जब पृथ्वी सूर्य और चंद्रमा के बीच आ जाती है और पृथ्वी की छाया पूर्णिमा के चाँद पर पड़ती है। इसे नंगी आँखों से देखना पूरी तरह सुरक्षित है। ग्रहण आपके शहर में दिखेगा या नहीं, यह इस पर निर्भर करता है कि उस समय चाँद क्षितिज के ऊपर है या नहीं।',
  },
  rituals: {
    en: ['Many families observe sutak (a period of restraint) that starts 9 hours before a visible eclipse.', 'Temples close during the eclipse and reopen after cleansing.', 'A bath and charity (daan) are common after the eclipse ends.'],
    hi: ['कई परिवार दिखाई देने वाले ग्रहण से 9 घंटे पहले से सूतक मानते हैं।', 'ग्रहण के दौरान मंदिरों के कपाट बंद रहते हैं।', 'ग्रहण समाप्त होने के बाद स्नान और दान करने की परंपरा है।'],
  },
  faqs: {
    en: [['Is it safe to look at a lunar eclipse?', 'Yes. Unlike a solar eclipse, a lunar eclipse is completely safe to watch with your eyes, binoculars or a telescope.'], ['What is a penumbral eclipse?', 'The moon passes only through the faint outer shadow. The dimming is very hard to notice, and it is usually not treated as a grahan in panchangs.']],
    hi: [['क्या चंद्र ग्रहण देखना सुरक्षित है?', 'हाँ। सूर्य ग्रहण के विपरीत, चंद्र ग्रहण को आँखों, दूरबीन या टेलीस्कोप से देखना पूरी तरह सुरक्षित है।'], ['उपच्छाया (पेनुम्ब्रल) ग्रहण क्या है?', 'इसमें चाँद पृथ्वी की हल्की बाहरी छाया से गुजरता है। फर्क बहुत मुश्किल से दिखता है और पंचांगों में इसे आमतौर पर ग्रहण नहीं माना जाता।']],
  },
});

add({
  slug: 'eid-al-fitr', type: 'islamic', hmonth: 10, hday: 1, key: 'crescent', skin: 'eid', priority: 1,
  name: { en: 'Eid al-Fitr', hi: 'ईद-उल-फ़ित्र' },
  lunar: { en: '1 Shawwal', hi: '1 शव्वाल' },
  intro: {
    en: 'Eid al-Fitr marks the end of Ramadan. It begins when the new crescent moon of Shawwal is sighted, so the evening before Eid (Chand Raat) is all about spotting the moon just after sunset. The date shown here is an astronomical prediction for India. The final date is announced by moon-sighting committees.',
    hi: 'ईद-उल-फ़ित्र रमज़ान के अंत का त्योहार है। यह शव्वाल महीने का नया चाँद दिखने पर शुरू होता है, इसलिए ईद से पहले की शाम (चाँद रात) को सूर्यास्त के ठीक बाद चाँद देखा जाता है। यहाँ दी गई तारीख भारत के लिए खगोलीय अनुमान है। अंतिम तारीख चाँद कमेटियाँ घोषित करती हैं।',
  },
  rituals: {
    en: ['Look for the thin crescent low in the west, 15–40 minutes after sunset on Chand Raat.', 'Eid prayers (namaz) are held in the morning, followed by greetings and family visits.', 'Zakat al-Fitr (charity) is given before the Eid prayer.'],
    hi: ['चाँद रात को सूर्यास्त के 15–40 मिनट बाद पश्चिम में नीचे पतला चाँद देखें।', 'सुबह ईद की नमाज़ होती है, फिर मुबारकबाद और परिवार से मिलना।', 'ईद की नमाज़ से पहले ज़कात-उल-फ़ित्र (फ़ितरा) दिया जाता है।'],
  },
  faqs: {
    en: [['Why is Eid in India often a day after Saudi Arabia?', 'The crescent is easier to see further west and a day later the moon is older and brighter. India follows local sighting, so Eid here is often one day later.'], ['Where should I look for the Eid moon?', 'Face west just after sunset. The crescent is very thin and low; it sets soon after the sun. The moonset time for your city is shown above.']],
    hi: [['भारत में ईद अक्सर सऊदी अरब के एक दिन बाद क्यों होती है?', 'नया चाँद पश्चिम में आसानी से दिखता है और एक दिन बाद वह ज़्यादा चमकीला होता है। भारत में स्थानीय चाँद दिखने पर ईद मनाई जाती है, इसलिए अक्सर एक दिन बाद।'], ['ईद का चाँद कहाँ देखें?', 'सूर्यास्त के ठीक बाद पश्चिम की ओर देखें। चाँद बहुत पतला और नीचे होता है और जल्दी डूब जाता है। आपके शहर का चंद्रास्त समय ऊपर दिया है।']],
  },
});

add({
  slug: 'ramadan', type: 'islamic', hmonth: 9, hday: 1, key: 'crescent', skin: 'eid', priority: 1,
  name: { en: 'Ramadan Start', hi: 'रमज़ान की शुरुआत' },
  lunar: { en: '1 Ramadan', hi: '1 रमज़ान' },
  intro: {
    en: 'The holy month of Ramadan begins with the sighting of the new crescent moon. The first roza (fast) is kept the day after the moon is seen. The date here is an astronomical prediction for India; the official start is announced after local moon sighting.',
    hi: 'रमज़ान का पवित्र महीना नया चाँद दिखने के साथ शुरू होता है। चाँद दिखने के अगले दिन पहला रोज़ा रखा जाता है। यहाँ दी गई तारीख भारत के लिए खगोलीय अनुमान है; आधिकारिक घोषणा स्थानीय चाँद दिखने के बाद होती है।',
  },
  rituals: {
    en: ['Look for the crescent in the west just after sunset on the sighting evening.', 'Taraweeh prayers begin that night.', 'Sehri is eaten before dawn and the fast is broken at sunset with iftar.'],
    hi: ['चाँद देखने की शाम सूर्यास्त के बाद पश्चिम में देखें।', 'उसी रात से तरावीह की नमाज़ शुरू होती है।', 'सुबह होने से पहले सहरी और सूर्यास्त पर इफ़्तार से रोज़ा खोला जाता है।'],
  },
  faqs: {
    en: [['When will the Ramadan moon be seen in India?', 'The likely sighting evening is shown above. If the moon is not seen, the month starts a day later.']],
    hi: [['भारत में रमज़ान का चाँद कब दिखेगा?', 'संभावित शाम ऊपर दी गई है। अगर चाँद नहीं दिखा, तो महीना एक दिन बाद शुरू होगा।']],
  },
});

/* ========================= High priority ========================= */
add({
  slug: 'sharad-purnima', type: 'hindu', month: 6, tithi: 15, rule: 'moonrise', key: 'moonrise', skin: 'purnima', priority: 2,
  name: { en: 'Sharad Purnima', hi: 'शरद पूर्णिमा' },
  alt: { en: 'Kojagiri / Kojagara Purnima', hi: 'कोजागरी पूर्णिमा' },
  lunar: { en: 'Ashvin Purnima', hi: 'आश्विन पूर्णिमा' },
  intro: {
    en: 'Sharad Purnima is the full moon of the month of Ashvin, believed to be the one night when the moon shines with all sixteen kalas. People keep kheer in the moonlight overnight and eat it the next morning. In Maharashtra and Bengal it is celebrated as Kojagiri or Kojagari Lakshmi Puja.',
    hi: 'शरद पूर्णिमा आश्विन मास की पूर्णिमा है। मान्यता है कि इस रात चंद्रमा अपनी सोलह कलाओं से पूर्ण होता है। लोग रात भर चाँदनी में खीर रखते हैं और सुबह प्रसाद के रूप में खाते हैं। महाराष्ट्र और बंगाल में इसे कोजागरी लक्ष्मी पूजा के रूप में मनाया जाता है।',
  },
  rituals: {
    en: ['Prepare rice kheer and place it under the moonlight after moonrise.', 'Lakshmi puja and staying awake at night (Kojagara means "who is awake?").', 'Moon-gazing on rooftops and terraces.'],
    hi: ['चावल की खीर बनाकर चंद्रोदय के बाद चाँदनी में रखें।', 'लक्ष्मी पूजा और रात्रि जागरण (कोजागर का अर्थ है "कौन जाग रहा है?")।', 'छत पर चाँद दर्शन।'],
  },
  faqs: {
    en: [['When should kheer be kept in the moonlight?', 'After moonrise, once the moon is clear of buildings. Many people leave it out until midnight or overnight.']],
    hi: [['खीर चाँदनी में कब रखें?', 'चंद्रोदय के बाद, जब चाँद इमारतों से ऊपर दिखने लगे। कई लोग इसे आधी रात या पूरी रात रखते हैं।']],
  },
});

add({
  slug: 'ahoi-ashtami', states: ['Delhi', 'Punjab', 'Haryana', 'Chandigarh', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu and Kashmir', 'Madhya Pradesh'], type: 'hindu', month: 6, tithi: 23, rule: 'sunset', key: 'moonrise', skin: 'karva', priority: 2,
  name: { en: 'Ahoi Ashtami', hi: 'अहोई अष्टमी' },
  lunar: { en: 'Kartik Krishna Ashtami (Purnimanta)', hi: 'कार्तिक कृष्ण अष्टमी (पूर्णिमांत)' },
  intro: {
    en: 'Ahoi Ashtami is a fast kept by mothers for the well-being of their children, about four days after Karva Chauth. The fast is broken after sighting the stars in the evening, or after moonrise, which comes late at night on this day.',
    hi: 'अहोई अष्टमी का व्रत माताएँ संतान की खुशहाली के लिए करवा चौथ के लगभग चार दिन बाद रखती हैं। शाम को तारे देखकर या देर रात चंद्रोदय के बाद व्रत खोला जाता है।',
  },
  rituals: {
    en: ['Draw or place an image of Ahoi Mata and perform puja in the evening.', 'Offer arghya to the stars after sunset, or to the moon after moonrise.'],
    hi: ['अहोई माता का चित्र बनाकर या लगाकर शाम को पूजा करें।', 'सूर्यास्त के बाद तारों को या चंद्रोदय के बाद चंद्रमा को अर्घ्य दें।'],
  },
  faqs: {
    en: [['Why is the moonrise so late on Ahoi Ashtami?', 'Eight days after the full moon the moon rises close to midnight, which is why many women break the fast after seeing the stars instead.']],
    hi: [['अहोई अष्टमी पर चाँद इतनी देर से क्यों निकलता है?', 'पूर्णिमा के आठ दिन बाद चाँद लगभग आधी रात को निकलता है, इसलिए कई महिलाएँ तारे देखकर व्रत खोलती हैं।']],
  },
});

add({
  slug: 'ganesh-chaturthi', type: 'hindu', month: 5, tithi: 4, rule: 'midday', key: 'avoid', skin: 'ganesh', priority: 2,
  name: { en: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी' },
  alt: { en: 'Vinayaka Chaturthi · Vinayaka Chavithi · Vinayagar Chathurthi', hi: 'विनायक चतुर्थी · विनायक चविति · विनायगर चतुर्थी' },
  lunar: { en: 'Bhadrapada Shukla Chaturthi', hi: 'भाद्रपद शुक्ल चतुर्थी' },
  intro: {
    en: 'Ganesh Chaturthi celebrates the birth of Lord Ganesha with home and community idols, and ends with visarjan after up to ten days. By tradition, seeing the moon on this night is avoided (it is said to bring false blame, "mithya dosh"), so people want to know until when the moon stays in the sky.',
    hi: 'गणेश चतुर्थी पर भगवान गणेश के जन्मोत्सव में घरों और पंडालों में प्रतिमाएँ स्थापित की जाती हैं और दस दिन तक उत्सव चलता है। परंपरा के अनुसार इस रात चाँद देखना वर्जित माना जाता है (मिथ्या दोष), इसलिए लोग जानना चाहते हैं कि चाँद कब तक आसमान में रहेगा।',
  },
  rituals: {
    en: ['Ganesh sthapana (installing the idol) during the midday muhurat.', 'Offer modak, durva and red flowers.', 'Avoid looking at the moon until moonset; if seen by mistake, the Syamantaka mani story is recited.'],
    hi: ['मध्याह्न मुहूर्त में गणेश स्थापना।', 'मोदक, दूर्वा और लाल फूल अर्पित करें।', 'चंद्रास्त तक चाँद देखने से बचें; गलती से दिख जाए तो स्यमंतक मणि की कथा पढ़ें।'],
  },
  faqs: {
    en: [['Until what time should we not see the moon?', 'Until moonset that night. On this date the moon rises in the morning and sets in the late evening; the moonset time for your city is shown above.']],
    hi: [['चाँद कितने बजे तक नहीं देखना चाहिए?', 'उस रात चंद्रास्त तक। इस दिन चाँद सुबह निकलता है और देर शाम डूबता है; आपके शहर का चंद्रास्त समय ऊपर दिया है।']],
  },
});

add({
  slug: 'diwali', type: 'hindu', month: 6, tithi: 30, rule: 'pradosh', key: 'amavasya', skin: 'diwali', priority: 2,
  name: { en: 'Diwali (Lakshmi Puja)', hi: 'दीवाली (लक्ष्मी पूजा)' },
  lunar: { en: 'Kartik Amavasya (Purnimanta)', hi: 'कार्तिक अमावस्या (पूर्णिमांत)' },
  intro: {
    en: 'Diwali, the festival of lights, is celebrated on the new moon (Amavasya) night of Kartik, the darkest night of the month, which is why homes are lit with diyas. Lakshmi Puja is done in the evening during Pradosh Kaal, after sunset, when Amavasya prevails.',
    hi: 'दीपों का त्योहार दीवाली कार्तिक अमावस्या की रात मनाया जाता है, जो महीने की सबसे अंधेरी रात होती है, इसीलिए घरों को दीयों से रोशन किया जाता है। लक्ष्मी पूजा शाम को सूर्यास्त के बाद प्रदोष काल में की जाती है, जब अमावस्या तिथि हो।',
  },
  rituals: {
    en: ['Clean and decorate the home with rangoli and diyas.', 'Lakshmi–Ganesh puja after sunset in Pradosh Kaal.', 'Light diyas around the house and share sweets.'],
    hi: ['घर की सफ़ाई और रंगोली व दीयों से सजावट।', 'सूर्यास्त के बाद प्रदोष काल में लक्ष्मी–गणेश पूजा।', 'घर भर में दीये जलाएँ और मिठाई बाँटें।'],
  },
  faqs: {
    en: [['Will the moon be visible on Diwali?', 'No. Diwali falls on Amavasya, when the moon is next to the sun and cannot be seen at night.']],
    hi: [['क्या दीवाली पर चाँद दिखेगा?', 'नहीं। दीवाली अमावस्या को होती है, जब चाँद सूर्य के पास होता है और रात में नहीं दिखता।']],
  },
});

add({
  slug: 'purnima', type: 'series', series: 'purnima', tithi: 15, rule: 'moonrise', key: 'moonrise', skin: 'purnima', priority: 2,
  name: { en: 'Purnima (Full Moon)', hi: 'पूर्णिमा' },
  lunar: { en: 'Shukla Purnima, every month', hi: 'हर माह की शुक्ल पूर्णिमा' },
  intro: {
    en: 'Purnima is the full moon day that ends the bright half (Shukla Paksha) of every Hindu month. Purnima vrat, Satyanarayan katha and holy dips are common. Many Purnimas are festivals in their own right, such as Guru Purnima, Sharad Purnima and Kartik Purnima.',
    hi: 'पूर्णिमा हर हिंदू महीने के शुक्ल पक्ष का अंतिम दिन है, जब चाँद पूरा होता है। इस दिन पूर्णिमा व्रत, सत्यनारायण कथा और पवित्र स्नान की परंपरा है। गुरु पूर्णिमा, शरद पूर्णिमा और कार्तिक पूर्णिमा जैसे कई बड़े त्योहार पूर्णिमा पर ही आते हैं।',
  },
  rituals: {
    en: ['Purnima vrat with Satyanarayan katha.', 'Holy bath and charity in the morning.', 'Offer arghya to the moon after moonrise.'],
    hi: ['सत्यनारायण कथा के साथ पूर्णिमा व्रत।', 'सुबह पवित्र स्नान और दान।', 'चंद्रोदय के बाद चंद्रमा को अर्घ्य।'],
  },
  faqs: {
    en: [['Why does Purnima sometimes start a day earlier?', 'A tithi is based on the angle between the sun and moon, not on the clock, so it can start at any time of day. Vrat is usually kept on the day the Purnima tithi prevails at moonrise.']],
    hi: [['पूर्णिमा कभी-कभी एक दिन पहले क्यों शुरू होती है?', 'तिथि सूर्य और चंद्रमा के बीच के कोण पर आधारित है, घड़ी पर नहीं, इसलिए यह दिन में किसी भी समय शुरू हो सकती है। व्रत आमतौर पर उस दिन रखा जाता है जब चंद्रोदय के समय पूर्णिमा तिथि हो।']],
  },
});

add({
  slug: 'amavasya', type: 'series', series: 'amavasya', tithi: 30, rule: 'midday', key: 'tithi', skin: 'diwali', priority: 2, noCityPages: true,
  name: { en: 'Amavasya (New Moon)', hi: 'अमावस्या' },
  lunar: { en: 'Krishna Amavasya, every month', hi: 'हर माह की कृष्ण अमावस्या' },
  intro: {
    en: 'Amavasya is the new moon day at the end of the dark half (Krishna Paksha). It is important for remembering ancestors (pitru tarpan) and for holy dips. Somvati Amavasya falls on a Monday, and Shani Amavasya on a Saturday.',
    hi: 'अमावस्या कृष्ण पक्ष का अंतिम दिन है, जब चाँद दिखाई नहीं देता। यह पितरों के तर्पण और पवित्र स्नान के लिए महत्वपूर्ण है। सोमवार को पड़ने वाली अमावस्या सोमवती और शनिवार को शनि अमावस्या कहलाती है।',
  },
  rituals: {
    en: ['Pitru tarpan and daan (charity).', 'Holy dip in a river where possible.', 'Lighting a diya under a peepal tree in the evening.'],
    hi: ['पितृ तर्पण और दान।', 'संभव हो तो नदी में स्नान।', 'शाम को पीपल के नीचे दीया जलाना।'],
  },
  faqs: {
    en: [['Can the moon be seen on Amavasya?', 'No. The moon is in the same direction as the sun, so its lit side faces away from us.']],
    hi: [['क्या अमावस्या पर चाँद दिखता है?', 'नहीं। चाँद सूर्य की दिशा में होता है, इसलिए उसका रोशन हिस्सा हमसे दूर होता है।']],
  },
});

/* ========================= Medium priority ========================= */
add({
  slug: 'holi', type: 'holi', month: 11, tithi: 16, rule: 'sunrise', key: 'holi', skin: 'holi', priority: 3,
  name: { en: 'Holi & Holika Dahan', hi: 'होली और होलिका दहन' },
  lunar: { en: 'Phalguna Purnima (Holika Dahan), Chaitra Krishna Pratipada (Holi)', hi: 'फाल्गुन पूर्णिमा (होलिका दहन), चैत्र कृष्ण प्रतिपदा (होली)' },
  intro: {
    en: 'Holika Dahan is lit on the night of Phalguna Purnima, celebrating the victory of good over evil, and the festival of colours is played the next morning. The bonfire is lit after sunset on the full-moon evening, avoiding Bhadra Kaal.',
    hi: 'फाल्गुन पूर्णिमा की रात बुराई पर अच्छाई की जीत के प्रतीक के रूप में होलिका दहन होता है, और अगली सुबह रंगों का त्योहार होली खेली जाती है। दहन सूर्यास्त के बाद पूर्णिमा की शाम को भद्रा काल से बचकर किया जाता है।',
  },
  rituals: {
    en: ['Holika Dahan bonfire with puja and parikrama on the full-moon night.', 'Holi (Dhulandi/Rangwali Holi) with colours the next morning.', 'Gujiya, thandai and visits to family and friends.'],
    hi: ['पूर्णिमा की रात पूजा और परिक्रमा के साथ होलिका दहन।', 'अगली सुबह रंगों के साथ होली (धुलंडी)।', 'गुजिया, ठंडाई और मिलना-जुलना।'],
  },
  faqs: {
    en: [['What is the Holika Dahan muhurat?', 'It is after sunset on the Purnima evening, outside Bhadra Kaal. Exact muhurat varies by panchang, so confirm with your local priest.']],
    hi: [['होलिका दहन का मुहूर्त क्या है?', 'पूर्णिमा की शाम सूर्यास्त के बाद, भद्रा काल के बाहर। सटीक मुहूर्त पंचांग के अनुसार अलग हो सकता है, इसलिए स्थानीय पंडित से पुष्टि करें।']],
  },
});

add({
  slug: 'raksha-bandhan', type: 'hindu', month: 4, tithi: 15, rule: 'sunrise', key: 'tithi', skin: 'rakhi', priority: 3,
  name: { en: 'Raksha Bandhan', hi: 'रक्षा बंधन' },
  lunar: { en: 'Shravana Purnima', hi: 'श्रावण पूर्णिमा' },
  intro: {
    en: 'Raksha Bandhan celebrates the bond between brothers and sisters. It falls on Shravana Purnima. Rakhi is tied during the Purnima tithi, avoiding Bhadra Kaal, which is why the tithi start and end times matter.',
    hi: 'रक्षा बंधन भाई-बहन के रिश्ते का त्योहार है, जो श्रावण पूर्णिमा को मनाया जाता है। राखी पूर्णिमा तिथि में भद्रा काल से बचकर बाँधी जाती है, इसलिए तिथि का शुरू और खत्म होने का समय महत्वपूर्ण है।',
  },
  rituals: {
    en: ['Sister ties a rakhi on the brother\'s wrist after aarti and tilak.', 'Brother gives a gift and a promise of protection.', 'Many also perform Shravani Upakarma on this day.'],
    hi: ['आरती और तिलक के बाद बहन भाई की कलाई पर राखी बाँधती है।', 'भाई उपहार और रक्षा का वचन देता है।', 'कई लोग इस दिन श्रावणी उपाकर्म भी करते हैं।'],
  },
  faqs: {
    en: [['What is the best time to tie rakhi?', 'During Purnima tithi, after Bhadra ends. Check your local panchang for the Bhadra timing.']],
    hi: [['राखी बाँधने का सबसे अच्छा समय क्या है?', 'पूर्णिमा तिथि में, भद्रा समाप्त होने के बाद। भद्रा का समय स्थानीय पंचांग में देखें।']],
  },
});

add({
  slug: 'guru-purnima', type: 'hindu', month: 3, tithi: 15, rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 3,
  name: { en: 'Guru Purnima', hi: 'गुरु पूर्णिमा' },
  alt: { en: 'Vyasa Purnima', hi: 'व्यास पूर्णिमा' },
  lunar: { en: 'Ashadha Purnima', hi: 'आषाढ़ पूर्णिमा' },
  intro: {
    en: 'Guru Purnima honours teachers and spiritual guides, and marks the birth of Maharishi Ved Vyasa. It falls on the full moon of Ashadha, at the start of the monsoon Chaturmas period.',
    hi: 'गुरु पूर्णिमा पर गुरुओं और शिक्षकों का सम्मान किया जाता है। यह महर्षि वेदव्यास का जन्मदिवस भी है। यह आषाढ़ पूर्णिमा को, चातुर्मास की शुरुआत में आती है।',
  },
  rituals: { en: ['Guru puja and seeking blessings from teachers.', 'Satsang, reading of scriptures, and charity.'], hi: ['गुरु पूजा और शिक्षकों का आशीर्वाद।', 'सत्संग, ग्रंथ पाठ और दान।'] },
  faqs: { en: [['Is Guru Purnima the same date everywhere in India?', 'Yes, the date is the same; only moonrise times differ by city.']], hi: [['क्या गुरु पूर्णिमा पूरे भारत में एक ही दिन है?', 'हाँ, तारीख एक ही है; केवल चंद्रोदय का समय शहर के अनुसार बदलता है।']] },
});

add({
  slug: 'buddha-purnima', type: 'hindu', month: 1, tithi: 15, rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 3,
  name: { en: 'Buddha Purnima', hi: 'बुद्ध पूर्णिमा' },
  alt: { en: 'Vesak', hi: 'वैशाख पूर्णिमा' },
  lunar: { en: 'Vaishakha Purnima', hi: 'वैशाख पूर्णिमा' },
  intro: {
    en: 'Buddha Purnima marks the birth, enlightenment and passing of Gautama Buddha. It is celebrated on the full moon of Vaishakha with prayers, meditation and acts of kindness.',
    hi: 'बुद्ध पूर्णिमा गौतम बुद्ध के जन्म, ज्ञान प्राप्ति और महापरिनिर्वाण का दिन है। इसे वैशाख पूर्णिमा को प्रार्थना, ध्यान और दान के साथ मनाया जाता है।',
  },
  rituals: { en: ['Visits to viharas and Bodh Gaya, prayers and meditation.', 'Offering food and charity; many avoid non-vegetarian food.'], hi: ['विहारों और बोधगया में दर्शन, प्रार्थना और ध्यान।', 'भोजन दान; कई लोग मांसाहार से परहेज़ करते हैं।'] },
  faqs: { en: [['Why is Buddha Purnima on a full moon?', 'Buddhist tradition holds that the key events of the Buddha\'s life happened on the full moon of Vaishakha.']], hi: [['बुद्ध पूर्णिमा पूर्णिमा पर ही क्यों?', 'बौद्ध परंपरा के अनुसार बुद्ध के जीवन की प्रमुख घटनाएँ वैशाख पूर्णिमा को हुईं।']] },
});

add({
  slug: 'hanuman-jayanti', type: 'hindu', month: 0, tithi: 15, rule: 'sunrise', key: 'tithi', skin: 'rakhi', priority: 3,
  name: { en: 'Hanuman Jayanti', hi: 'हनुमान जयंती' },
  lunar: { en: 'Chaitra Purnima (North India)', hi: 'चैत्र पूर्णिमा (उत्तर भारत)' },
  intro: {
    en: 'Hanuman Jayanti celebrates the birth of Lord Hanuman. In most of North India it is observed on Chaitra Purnima; some southern states celebrate it on other dates.',
    hi: 'हनुमान जयंती भगवान हनुमान का जन्मोत्सव है। उत्तर भारत में यह चैत्र पूर्णिमा को मनाई जाती है; कुछ दक्षिणी राज्यों में अलग तिथि पर।',
  },
  rituals: { en: ['Hanuman Chalisa and Sundarkand path.', 'Offer sindoor, chola and boondi at Hanuman temples.'], hi: ['हनुमान चालीसा और सुंदरकांड पाठ।', 'हनुमान मंदिर में सिंदूर, चोला और बूँदी अर्पित करें।'] },
  faqs: { en: [['Why do some states celebrate Hanuman Jayanti on a different date?', 'Regional calendars differ. Tamil Nadu and Kerala, for example, observe it in Margazhi (Dec–Jan).']], hi: [['कुछ राज्यों में हनुमान जयंती अलग दिन क्यों?', 'क्षेत्रीय पंचांग अलग हैं। जैसे तमिलनाडु और केरल में यह मार्गशीर्ष (दिसंबर–जनवरी) में मनाई जाती है।']] },
});

add({
  slug: 'vat-purnima', type: 'hindu', month: 2, tithi: 15, rule: 'sunrise', key: 'tithi', skin: 'teej', priority: 3,
  name: { en: 'Vat Purnima', hi: 'वट पूर्णिमा' },
  lunar: { en: 'Jyeshtha Purnima', hi: 'ज्येष्ठ पूर्णिमा' },
  intro: {
    en: 'Vat Purnima is observed by married women, mainly in Maharashtra, Gujarat and Karnataka, by worshipping the banyan (vat) tree for their husbands\' long life, remembering Savitri and Satyavan.',
    hi: 'वट पूर्णिमा पर विवाहित महिलाएँ, मुख्य रूप से महाराष्ट्र, गुजरात और कर्नाटक में, पति की लंबी आयु के लिए सावित्री-सत्यवान को याद करते हुए वट (बरगद) वृक्ष की पूजा करती हैं।',
  },
  rituals: { en: ['Tie a sacred thread around the banyan tree while circling it.', 'Listen to the Savitri–Satyavan katha.'], hi: ['वट वृक्ष की परिक्रमा करते हुए कच्चा सूत बाँधें।', 'सावित्री–सत्यवान की कथा सुनें।'] },
  faqs: { en: [['How is Vat Purnima different from Vat Savitri?', 'North India observes Vat Savitri on Jyeshtha Amavasya; western India observes Vat Purnima on the full moon, fifteen days later.']], hi: [['वट पूर्णिमा और वट सावित्री में क्या अंतर है?', 'उत्तर भारत में वट सावित्री ज्येष्ठ अमावस्या को और पश्चिम भारत में वट पूर्णिमा पंद्रह दिन बाद पूर्णिमा को मनाई जाती है।']] },
});

add({
  slug: 'kartik-purnima', type: 'hindu', month: 7, tithi: 15, rule: 'sunrise', key: 'moonrise', skin: 'diwali', priority: 3,
  name: { en: 'Kartik Purnima & Dev Deepawali', hi: 'कार्तिक पूर्णिमा और देव दीपावली' },
  alt: { en: 'Guru Nanak Jayanti', hi: 'गुरु नानक जयंती' },
  lunar: { en: 'Kartika Purnima', hi: 'कार्तिक पूर्णिमा' },
  intro: {
    en: 'Kartik Purnima is one of the holiest full moons of the year. Varanasi lights its ghats with lakhs of diyas for Dev Deepawali, and Sikhs celebrate Guru Nanak Jayanti (Gurpurab) on this day.',
    hi: 'कार्तिक पूर्णिमा साल की सबसे पवित्र पूर्णिमाओं में से है। वाराणसी में देव दीपावली पर घाटों पर लाखों दीये जलाए जाते हैं, और सिख समुदाय इसी दिन गुरु नानक जयंती (गुरपुरब) मनाता है।',
  },
  rituals: { en: ['Holy dip (Kartik snan) in the Ganga or other rivers.', 'Deep daan: floating or lighting diyas on the ghats in the evening.', 'Prabhat pheris and langar for Gurpurab.'], hi: ['गंगा या अन्य नदियों में कार्तिक स्नान।', 'शाम को घाटों पर दीपदान।', 'गुरपुरब पर प्रभात फेरी और लंगर।'] },
  faqs: { en: [['Is Guru Nanak Jayanti always on Kartik Purnima?', 'Yes, Gurpurab is celebrated on the full moon of Kartik.']], hi: [['क्या गुरु नानक जयंती हमेशा कार्तिक पूर्णिमा को होती है?', 'हाँ, गुरपुरब कार्तिक पूर्णिमा को मनाया जाता है।']] },
});

add({
  slug: 'kajari-teej', states: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan', 'Jharkhand', 'Uttarakhand'], type: 'hindu', month: 4, tithi: 18, rule: 'moonrise', key: 'moonrise', skin: 'teej', priority: 3,
  name: { en: 'Kajari Teej', hi: 'कजरी तीज' },
  alt: { en: 'Satudi Teej', hi: 'सातुड़ी तीज' },
  lunar: { en: 'Bhadrapada Krishna Tritiya (Purnimanta)', hi: 'भाद्रपद कृष्ण तृतीया (पूर्णिमांत)' },
  intro: {
    en: 'Kajari Teej is a fast kept by women in Rajasthan, Uttar Pradesh, Bihar and Madhya Pradesh. The fast is broken after offering arghya to the moon, so moonrise time matters.',
    hi: 'कजरी तीज का व्रत राजस्थान, उत्तर प्रदेश, बिहार और मध्य प्रदेश में महिलाएँ रखती हैं। चंद्रमा को अर्घ्य देकर व्रत खोला जाता है, इसलिए चंद्रोदय का समय महत्वपूर्ण है।',
  },
  rituals: { en: ['Neemdi Mata puja in the evening.', 'Sattu sweets are offered and eaten.', 'Arghya to the moon after moonrise.'], hi: ['शाम को नीमड़ी माता की पूजा।', 'सत्तू के पकवान का भोग।', 'चंद्रोदय के बाद चंद्रमा को अर्घ्य।'] },
  faqs: { en: [['When is the moonrise on Kajari Teej?', 'Usually between 8 and 9:30 PM, depending on the city. Pick your city above.']], hi: [['कजरी तीज पर चाँद कब निकलेगा?', 'शहर के अनुसार आमतौर पर रात 8 से 9:30 के बीच। ऊपर अपना शहर चुनें।']] },
});

add({
  slug: 'hariyali-teej', type: 'hindu', month: 4, tithi: 3, rule: 'sunrise', key: 'tithi', skin: 'teej', priority: 3,
  name: { en: 'Hariyali Teej', hi: 'हरियाली तीज' },
  lunar: { en: 'Shravana Shukla Tritiya', hi: 'श्रावण शुक्ल तृतीया' },
  intro: {
    en: 'Hariyali Teej welcomes the monsoon and celebrates the union of Shiva and Parvati. Women dress in green, apply mehndi, sing teej songs and enjoy swings.',
    hi: 'हरियाली तीज मानसून का स्वागत और शिव-पार्वती के मिलन का उत्सव है। महिलाएँ हरे वस्त्र पहनती हैं, मेहंदी लगाती हैं, तीज के गीत गाती हैं और झूला झूलती हैं।',
  },
  rituals: { en: ['Shiva–Parvati puja and fasting.', 'Mehndi, green bangles and swings.'], hi: ['शिव–पार्वती पूजा और व्रत।', 'मेहंदी, हरी चूड़ियाँ और झूले।'] },
  faqs: { en: [['How many Teej festivals are there?', 'Three main ones: Hariyali Teej, Kajari Teej and Hartalika Teej, in the months of Shravana and Bhadrapada.']], hi: [['तीज कितनी होती हैं?', 'तीन मुख्य: हरियाली तीज, कजरी तीज और हरतालिका तीज, श्रावण और भाद्रपद में।']] },
});

add({
  slug: 'hartalika-teej', type: 'hindu', month: 5, tithi: 3, rule: 'sunrise', key: 'tithi', skin: 'teej', priority: 3,
  name: { en: 'Hartalika Teej', hi: 'हरतालिका तीज' },
  lunar: { en: 'Bhadrapada Shukla Tritiya', hi: 'भाद्रपद शुक्ल तृतीया' },
  intro: {
    en: 'Hartalika Teej is a strict nirjala (waterless) fast kept by women for marital happiness, honouring Parvati\'s devotion to Shiva. It falls a day before Ganesh Chaturthi.',
    hi: 'हरतालिका तीज पर महिलाएँ वैवाहिक सुख के लिए कठोर निर्जला व्रत रखती हैं, जो शिव के प्रति पार्वती की भक्ति की याद में है। यह गणेश चतुर्थी से एक दिन पहले आती है।',
  },
  rituals: { en: ['Clay idols of Shiva and Parvati are worshipped.', 'Night-long jagran with bhajans.', 'The fast is broken the next morning.'], hi: ['शिव–पार्वती की मिट्टी की प्रतिमाओं की पूजा।', 'रात भर भजन के साथ जागरण।', 'अगली सुबह व्रत खोला जाता है।'] },
  faqs: { en: [['Is Hartalika Teej broken at moonrise?', 'No. It is traditionally broken the next morning after puja.']], hi: [['क्या हरतालिका तीज चाँद देखकर खोली जाती है?', 'नहीं। परंपरागत रूप से इसे अगली सुबह पूजा के बाद खोला जाता है।']] },
});

add({
  slug: 'mahalaya-amavasya', type: 'hindu', month: 5, tithi: 30, rule: 'midday', key: 'tithi', skin: 'diwali', priority: 3, noCityPages: true,
  name: { en: 'Mahalaya Amavasya', hi: 'महालया अमावस्या' },
  alt: { en: 'Sarva Pitru Amavasya', hi: 'सर्व पितृ अमावस्या' },
  lunar: { en: 'Ashvin Amavasya (Purnimanta)', hi: 'आश्विन अमावस्या (पूर्णिमांत)' },
  intro: {
    en: 'Mahalaya Amavasya ends Pitru Paksha, the fortnight for remembering ancestors. Shraddha and tarpan are performed for all ancestors on this day. In Bengal it also marks the start of Durga Puja celebrations.',
    hi: 'महालया अमावस्या पितृ पक्ष का अंतिम दिन है। इस दिन सभी पितरों का श्राद्ध और तर्पण किया जाता है। बंगाल में इसी दिन से दुर्गा पूजा उत्सव की शुरुआत मानी जाती है।',
  },
  rituals: { en: ['Shraddha and tarpan for ancestors.', 'Feeding Brahmins, cows, crows and the needy.'], hi: ['पितरों का श्राद्ध और तर्पण।', 'ब्राह्मण, गाय, कौए और ज़रूरतमंदों को भोजन।'] },
  faqs: { en: [['Who can perform shraddha on Mahalaya?', 'Anyone who does not know the tithi of an ancestor\'s passing can perform shraddha for them on this day.']], hi: [['महालया पर श्राद्ध कौन कर सकता है?', 'जिन्हें पितरों की तिथि ज्ञात नहीं, वे इस दिन उनका श्राद्ध कर सकते हैं।']] },
});

add({
  slug: 'mauni-amavasya', type: 'hindu', month: 9, tithi: 30, rule: 'sunrise', key: 'tithi', skin: 'diwali', priority: 3, noCityPages: true,
  name: { en: 'Mauni Amavasya', hi: 'मौनी अमावस्या' },
  lunar: { en: 'Magha Amavasya (Purnimanta)', hi: 'माघ अमावस्या (पूर्णिमांत)' },
  intro: {
    en: 'Mauni Amavasya is one of the most important bathing days of the Magh Mela. Devotees keep silence (maun) and take a holy dip, especially at the Sangam in Prayagraj.',
    hi: 'मौनी अमावस्या माघ मेले के सबसे महत्वपूर्ण स्नान पर्वों में से है। श्रद्धालु मौन व्रत रखते हैं और विशेष रूप से प्रयागराज के संगम में स्नान करते हैं।',
  },
  rituals: { en: ['Holy dip at sunrise.', 'Observing silence for the day or part of it.', 'Charity of sesame, blankets and food.'], hi: ['सूर्योदय के समय स्नान।', 'पूरे दिन या कुछ समय मौन।', 'तिल, कंबल और अन्न का दान।'] },
  faqs: { en: [['Why is silence kept on Mauni Amavasya?', '"Mauni" comes from "maun" (silence); keeping quiet is believed to bring inner calm and spiritual merit.']], hi: [['मौनी अमावस्या पर मौन क्यों रखते हैं?', '"मौनी" शब्द "मौन" से बना है; माना जाता है कि मौन से मन शांत होता है और पुण्य मिलता है।']] },
});

add({
  slug: 'ekadashi', type: 'series', series: 'ekadashi', tithi: 11, rule: 'sunrise', key: 'tithi', skin: 'purnima', priority: 3, noCityPages: true,
  name: { en: 'Ekadashi', hi: 'एकादशी' },
  lunar: { en: '11th tithi of both pakshas', hi: 'दोनों पक्षों की ग्यारहवीं तिथि' },
  intro: {
    en: 'Ekadashi is the eleventh lunar day of each fortnight, dedicated to Lord Vishnu. There are 24 Ekadashis in a year (26 in a year with an extra month), each with its own name, such as Nirjala, Devshayani and Dev Uthani Ekadashi.',
    hi: 'एकादशी हर पक्ष की ग्यारहवीं तिथि है, जो भगवान विष्णु को समर्पित है। साल में 24 एकादशियाँ होती हैं (अधिक मास वाले साल में 26), और हर एक का अपना नाम है, जैसे निर्जला, देवशयनी और देवउठनी एकादशी।',
  },
  rituals: { en: ['Fast from grains on Ekadashi.', 'Vishnu puja and reading of Vishnu Sahasranama.', 'Break the fast (parana) the next morning after sunrise.'], hi: ['एकादशी पर अन्न का त्याग।', 'विष्णु पूजा और विष्णु सहस्रनाम पाठ।', 'अगले दिन सूर्योदय के बाद पारण।'] },
  faqs: { en: [['Why do some calendars show Ekadashi on two days?', 'Smarta and Vaishnava traditions follow slightly different rules when Ekadashi touches Dashami. This site follows the sunrise rule; check your sampradaya\'s calendar.']], hi: [['कुछ पंचांगों में एकादशी दो दिन क्यों होती है?', 'स्मार्त और वैष्णव परंपराओं के नियम थोड़े अलग हैं। यह साइट सूर्योदय नियम का पालन करती है; अपनी परंपरा का पंचांग देखें।']] },
});

add({
  slug: 'chandra-darshan', type: 'series', series: 'chandra-darshan', key: 'crescent', skin: 'eid', priority: 3,
  name: { en: 'Chandra Darshan', hi: 'चंद्र दर्शन' },
  lunar: { en: 'First evening crescent after Amavasya', hi: 'अमावस्या के बाद पहली शाम का चाँद' },
  intro: {
    en: 'Chandra Darshan is the first sighting of the thin crescent moon after Amavasya. It is considered auspicious, and many people fast during the day and offer prayers to the moon after sunset.',
    hi: 'चंद्र दर्शन अमावस्या के बाद पहली बार पतले चाँद का दिखना है। इसे शुभ माना जाता है, और कई लोग दिन में व्रत रखकर सूर्यास्त के बाद चंद्रमा की पूजा करते हैं।',
  },
  rituals: { en: ['Look low in the west 15–45 minutes after sunset.', 'Offer prayers to Chandra Dev.'], hi: ['सूर्यास्त के 15–45 मिनट बाद पश्चिम में नीचे देखें।', 'चंद्र देव की प्रार्थना करें।'] },
  faqs: { en: [['Why is the crescent hard to see?', 'It is thin, close to the sun and sets soon after it. A clear western horizon helps a lot.']], hi: [['पहला चाँद देखना मुश्किल क्यों है?', 'यह पतला होता है, सूर्य के पास होता है और उसके तुरंत बाद डूब जाता है। साफ़ पश्चिमी क्षितिज बहुत मदद करता है।']] },
});

add({
  slug: 'eid-al-adha', type: 'islamic', hmonth: 12, hday: 10, key: 'date', skin: 'eid', priority: 3, noCityPages: true,
  name: { en: 'Eid al-Adha (Bakrid)', hi: 'ईद-उल-अज़हा (बकरीद)' },
  lunar: { en: '10 Dhul Hijjah', hi: '10 ज़िलहिज्जा' },
  intro: {
    en: 'Eid al-Adha, the festival of sacrifice, falls on the 10th day of Dhul Hijjah, the month of Hajj. Its date depends on the sighting of the Dhul Hijjah crescent about ten days earlier. The date here is an astronomical prediction for India.',
    hi: 'ईद-उल-अज़हा, क़ुर्बानी का त्योहार, हज के महीने ज़िलहिज्जा की 10 तारीख को होता है। इसकी तारीख लगभग दस दिन पहले ज़िलहिज्जा का चाँद दिखने पर तय होती है। यहाँ दी गई तारीख भारत के लिए खगोलीय अनुमान है।',
  },
  rituals: { en: ['Eid prayer in the morning.', 'Qurbani (sacrifice) and sharing meat with family, neighbours and the poor.'], hi: ['सुबह ईद की नमाज़।', 'क़ुर्बानी और गोश्त को परिवार, पड़ोसियों और गरीबों में बाँटना।'] },
  faqs: { en: [['When is the Bakrid moon sighted?', 'About ten days before Eid, at the start of Dhul Hijjah. The likely sighting evening is shown above.']], hi: [['बकरीद का चाँद कब देखा जाता है?', 'ईद से लगभग दस दिन पहले, ज़िलहिज्जा की शुरुआत में। संभावित शाम ऊपर दी है।']] },
});

add({
  slug: 'muharram', type: 'islamic', hmonth: 1, hday: 1, key: 'crescent', skin: 'eid', priority: 3, noCityPages: true,
  name: { en: 'Islamic New Year & Muharram', hi: 'इस्लामी नया साल और मुहर्रम' },
  lunar: { en: '1 Muharram (Ashura on the 10th)', hi: '1 मुहर्रम (10वीं को आशूरा)' },
  intro: {
    en: 'The Islamic year begins with the month of Muharram, after the new crescent is sighted. The 10th day, Ashura, is a day of mourning for the martyrdom of Imam Husain at Karbala and of fasting for many.',
    hi: 'इस्लामी साल मुहर्रम महीने से शुरू होता है, जो नया चाँद दिखने के बाद आता है। 10वाँ दिन, आशूरा, कर्बला में इमाम हुसैन की शहादत के शोक और कई लोगों के लिए रोज़े का दिन है।',
  },
  rituals: { en: ['Majlis and processions (tazia) leading up to Ashura.', 'Fasting on the 9th and 10th of Muharram for many.'], hi: ['आशूरा तक मजलिस और ताज़िया जुलूस।', 'कई लोग 9 और 10 मुहर्रम को रोज़ा रखते हैं।'] },
  faqs: { en: [['When is Ashura?', 'Nine days after 1 Muharram. The predicted date is shown above.']], hi: [['आशूरा कब है?', '1 मुहर्रम के नौ दिन बाद। अनुमानित तारीख ऊपर दी है।']] },
});

add({
  slug: 'shab-e-barat', type: 'islamic', hmonth: 8, hday: 15, key: 'night', skin: 'eid', priority: 3, noCityPages: true,
  name: { en: 'Shab-e-Barat', hi: 'शब-ए-बारात' },
  lunar: { en: 'Night of 14–15 Sha\'ban', hi: '14–15 शाबान की रात' },
  intro: {
    en: 'Shab-e-Barat, the night of forgiveness, is observed on the night between the 14th and 15th of Sha\'ban, about two weeks before Ramadan. The moon is nearly full on this night.',
    hi: 'शब-ए-बारात, माफ़ी की रात, शाबान की 14 और 15 तारीख के बीच की रात को मनाई जाती है, रमज़ान से लगभग दो हफ़्ते पहले। इस रात चाँद लगभग पूरा होता है।',
  },
  rituals: { en: ['Night prayers and recitation of the Quran.', 'Visiting graves of family members and praying for them.'], hi: ['रात भर इबादत और क़ुरान की तिलावत।', 'परिजनों की क़ब्रों पर जाकर दुआ।'] },
  faqs: { en: [['Which night is Shab-e-Barat?', 'It begins at sunset on the evening before the date shown above.']], hi: [['शब-ए-बारात कौन सी रात है?', 'यह ऊपर दी गई तारीख से पहले वाली शाम सूर्यास्त से शुरू होती है।']] },
});

/* ========================= South Indian & more (see festivals-south.js) ========================= */
require('./festivals-south')(add);

/* ---------- Ekadashi names ---------- */
const EK_SHUKLA = [['Kamada', 'कामदा'], ['Mohini', 'मोहिनी'], ['Nirjala', 'निर्जला'], ['Devshayani', 'देवशयनी'], ['Shravana Putrada', 'श्रावण पुत्रदा'], ['Parivartini', 'परिवर्तिनी'], ['Papankusha', 'पापांकुशा'], ['Dev Uthani (Prabodhini)', 'देवउठनी (प्रबोधिनी)'], ['Mokshada', 'मोक्षदा'], ['Pausha Putrada', 'पौष पुत्रदा'], ['Jaya', 'जया'], ['Amalaki', 'आमलकी']];
// Krishna Ekadashi named by Purnimanta month (= Amanta month + 1)
const EK_KRISHNA = [['Papmochani', 'पापमोचिनी'], ['Varuthini', 'वरूथिनी'], ['Apara', 'अपरा'], ['Yogini', 'योगिनी'], ['Kamika', 'कामिका'], ['Aja', 'अजा'], ['Indira', 'इंदिरा'], ['Rama', 'रमा'], ['Utpanna', 'उत्पन्ना'], ['Saphala', 'सफला'], ['Shattila', 'षट्तिला'], ['Vijaya', 'विजया']];
function ekadashiName(monthIndex, krishna, adhika) {
  if (adhika) return krishna ? ['Parama', 'परमा'] : ['Padmini', 'पद्मिनी'];
  return krishna ? EK_KRISHNA[(monthIndex + 1) % 12] : EK_SHUKLA[monthIndex];
}

/* ---------- Skins (colours + motif ids) ---------- */
const SKINS = {
  karva: { a: '#B3122E', b: '#F2B632', motif: 'chalni' },
  ganesh: { a: '#E2621B', b: '#FFC145', motif: 'modak' },
  grahan: { a: '#7A1F1F', b: '#E56B3B', motif: 'grahan' },
  eid: { a: '#0E6B50', b: '#E2C46B', motif: 'crescent' },
  purnima: { a: '#3C4C8C', b: '#E8E6F5', motif: 'fullmoon' },
  diwali: { a: '#2A1A05', b: '#FFB627', motif: 'diya' },
  holi: { a: '#C2187A', b: '#2BB5E8', motif: 'gulal' },
  rakhi: { a: '#C2410C', b: '#FACC15', motif: 'rakhi' },
  teej: { a: '#1F7A3A', b: '#E9D44C', motif: 'leaf' },
  pongal: { a: '#9A4A0B', b: '#F6C744', motif: 'pot' },
  onam: { a: '#1E6B34', b: '#F7B500', motif: 'pookalam' },
  deepam: { a: '#5A1E0A', b: '#FFB627', motif: 'diya' },
  murugan: { a: '#8B1E3F', b: '#F59E0B', motif: 'vel' },
  shiva: { a: '#1E2A5A', b: '#A9BCFF', motif: 'fullmoon' },
};

module.exports = { FESTIVALS: F, ekadashiName, SKINS };
