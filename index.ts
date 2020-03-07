// Import stylesheets
import './style.css';
import * as data from './coin_data.json';

// Country
// 	Denomination
// 		Varieties
// 			Types
// 				Coins

let newData = {};

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
const jsonPre: HTMLElement = document.getElementById('json');
//appDiv.innerHTML = `<h1>${data.Title}</h1>`;

newData.country = {
  title: data.Title,
  denominations: []
};

//
// denominations
//
let denomHtml = '<ul>';
for(let denomIndex = 0; denomIndex < data.Denominations.length; denomIndex++) {
  let denomTitle = data.Denominations[denomIndex].Title;
  let denomFaceValue = data.Denominations[denomIndex].FaceValue;
  let denomSourceUri = data.Denominations[denomIndex].SourceUri;
  let denom = {
    title: denomTitle,
    faceValue: denomFaceValue,
    sourceUri: denomSourceUri,
    varieties: []
  };
  
  denomHtml += `<li><a href="${denomSourceUri}">${denomTitle} - ${denomFaceValue}</a></li>`;

  //
  // varieties
  //  
  let varietyHtml = '<ul>';
  for(let varietyIndex = 0; varietyIndex < data.Denominations[denomIndex].Varieties.length; varietyIndex++) {
    let varietyTitle  = data.Denominations[denomIndex].Varieties[varietyIndex].Title;
    let varietySourceUri = data.Denominations[denomIndex].Varieties[varietyIndex].SourceUri;
    let variety = {
      title: varietyTitle,
      sourceUri: varietySourceUri,
      types: []
    };

    varietyHtml += `<li><a href="${varietySourceUri}">${varietyTitle}</a></li>`;

    //
    // types
    //
    let typeHtml = '<ul>';
    for(let typeIndex = 0; typeIndex < data.Denominations[denomIndex].Varieties[varietyIndex].Types.length; typeIndex++) {
      let typeTitle  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Title;
      let typeBeginDate  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].BeginDate;
      let typeEndDate  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].EndDate;
      let typeMetalComp  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].MetalComposition;
      let typeDiameter  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Diameter;
      let typeMass  = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Mass;
      let type = {
        title: typeTitle,
        beginDate: typeBeginDate,
        endDate: typeEndDate,
        metalComposition: typeMetalComp,
        diameter: typeDiameter,
        mass: typeMass,
        coins: []
      };
      typeHtml += `<li>${typeTitle} (${typeBeginDate} - ${typeEndDate})</li>`;

      //
      // coins
      //
      let coinsHtml = '<ul>';
      for(let coinIndex = 0; coinIndex < data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Coins.length; coinIndex++) {
        let coinYear = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Coins[coinIndex].Year;
        let coinMintMark = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Coins[coinIndex].MintMark;
        let coinDetails = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Coins[coinIndex].Details;
        let coinMintage = data.Denominations[denomIndex].Varieties[varietyIndex].Types[typeIndex].Coins[coinIndex].Mintage;
        let coin = {
            year: coinYear,
            mintMark: coinMintMark,
            details: coinDetails
        };

        if(coinDetails !== 'All Varieties') {
          coinsHtml += `<li>${coinYear} ${coinMintMark} ${coinDetails}</li>`;
          type.coins.push(coin);
        }
      }
      coinsHtml += '</ul>';
      typeHtml += coinsHtml;

      variety.types.push(type);
    }

    typeHtml += '</ul>';
    varietyHtml += typeHtml;

    denom.varieties.push(variety);
  }

  varietyHtml += '</ul>';
  denomHtml += varietyHtml;

  newData.country.denominations.push(denom);
}

denomHtml += '</ul>';

//appDiv.innerHTML += denomHtml;

jsonPre.innerHTML = JSON.stringify(newData, undefined, 4);