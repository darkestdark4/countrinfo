import { GlobeAsiaAustraliaIcon, MapIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline/index.js";
const CountryList = ({ data }) => {
	const PhoneList = ({ phoneData }) => {
		let phoneString = ''
		const root = phoneData.root
		const suffixes = phoneData.suffixes
		
		if(suffixes) {
			if(suffixes.length > 4) {
				phoneString = root
			} else {
				suffixes.forEach((phone, i) => {
					let phoneList = `${root}${phone}`
					if(phoneList.length > 4) {
						phoneList = `${root}-${phone}`
					}
					
					if((suffixes.length - 1) == i) {
						phoneString += phoneList
					} else {
						phoneString += `${phoneList}, `
					}
				})
			}
		} else {
			phoneString = '-'
		}
		
		return phoneString
	}
	
	return data.map((country, i) => {
		return (
			<div key={i} className="flex flex-col bg-white drop-shadow-md">
				<div className="bg-cover bg-no-repeat bg-center w-full h-40" style={{ backgroundImage: `url(${country.flags.png})` }}></div>
				<div className="flex flex-col p-5 ">
					<div className="text-sm">
						<h3 className="font-bold uppercase">{country.name.common}</h3>
					</div>
					<div className="flex flex-col mt-5 gap-2 text-sm">
						<div className="flex items-center">
							<UserIcon className="w-4 h-4 mr-2"></UserIcon>
							Population :&nbsp;
							{new Intl.NumberFormat().format(country.population)}
						</div>
						<div className="flex items-center">
							<MapIcon className="w-4 h-4 mr-2"></MapIcon>
							Area :&nbsp;
							{new Intl.NumberFormat().format(country.area)} km<sup>2</sup>
						</div>
						<div className="flex items-center">
							<PhoneIcon className="w-4 h-4 mr-2"></PhoneIcon>
							Phone Code :&nbsp;
							<PhoneList phoneData={country.idd}></PhoneList>
						</div>
						<div className="flex items-center">
							<GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2"></GlobeAsiaAustraliaIcon>
							Region :&nbsp;
							{country.region}
						</div>
					</div>
				</div>
			</div>
		)
	})
}

export default CountryList