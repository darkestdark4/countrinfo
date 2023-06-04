import { GlobeAsiaAustraliaIcon, MapIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline/index.js";
import { generatePhoneData, numberFormat } from '../helpers.js'

const CountryList = ({ data }) => {
	let result = ''
	const cutName = (name) => {
		const CUT_OFF_LIMIT = 23
		if(name.length > CUT_OFF_LIMIT) {
			result = `${name.substr(0, CUT_OFF_LIMIT)}...`
		} else {
			result = name
		}

		return result
	}

	return data.map((country, i) => {
		return (
			<div key={i} className="flex flex-col bg-white drop-shadow-md">
				<div className="bg-cover bg-no-repeat bg-center w-full h-40" style={{ backgroundImage: `url(${country.flags.png})` }}></div>
				<div className="flex flex-col p-5">
					<div className="text-sm">
						<h3 className="font-bold uppercase">{ cutName(country.name.common) }</h3>
					</div>
					<div className="flex flex-col mt-5 gap-2 text-sm">
						<div className="flex items-center">
							<UserIcon className="w-4 h-4 mr-2"></UserIcon>
							Population :&nbsp;
							{numberFormat(country.population)}
						</div>
						<div className="flex items-center">
							<MapIcon className="w-4 h-4 mr-2"></MapIcon>
							Area :&nbsp;
							{numberFormat(country.area)} km<sup>2</sup>
						</div>
						<div className="flex items-center">
							<PhoneIcon className="w-4 h-4 mr-2"></PhoneIcon>
							Phone Code :&nbsp;{ generatePhoneData(country.idd) }
						</div>
						<div className="flex items-center">
							<GlobeAsiaAustraliaIcon className="w-4 h-4 mr-2"></GlobeAsiaAustraliaIcon>
							Region :&nbsp;
							{country.region}
						</div>
					</div>
					<hr className="my-4"/>
					<div className="flex justify-end">
						<a href={`country/${country.cca3}`} className="text-sm cursor-pointer hover:underline">View detail</a>
					</div>
				</div>
			</div>
		)
	})
}

export default CountryList