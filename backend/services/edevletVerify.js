const axios = require('axios');
const { parseStringPromise } = require('xml2js');

const EDEVLET_ENDPOINT = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx';
const SOAP_ACTION = 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula';

// 🔧 Doğum yılı çıkarma fonksiyonu
const parseBirthYear = (dateString) => {
  if (dateString.includes('.')) {
    const [day, month, year] = dateString.split('.');
    return parseInt(year);
  }

  return new Date(dateString).getFullYear();
};

exports.verifyIdentity = async ({ identityNumber, name, surname, birthDate }) => {
  try {
    const birthYear = parseBirthYear(birthDate); // 🔁 burada düzeltme var

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
            <TCKimlikNo>${identityNumber}</TCKimlikNo>
            <Ad>${name.toUpperCase()}</Ad>
            <Soyad>${surname.toUpperCase()}</Soyad>
            <DogumYili>${birthYear}</DogumYili>
          </TCKimlikNoDogrula>
        </soap:Body>
      </soap:Envelope>`;

    const response = await axios.post(EDEVLET_ENDPOINT, soapRequest, {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': SOAP_ACTION,
      },
      timeout: 10000
    });

    const parsed = await parseStringPromise(response.data);
    const result = parsed['soap:Envelope']['soap:Body'][0]['TCKimlikNoDogrulaResponse'][0]['TCKimlikNoDogrulaResult'][0];
    return result === 'true';
  } catch (error) {
    console.error('🛑 e-Devlet doğrulama hatası:', error.message);
    return false;
  }
};
