export const seo = `
	...,
	metaImage{
		asset->{
			url
		}
	}
`;

export const blockContent = `
	...,

	markDefs[] {
		...,
		_type == "linkInternal" => {
			...,
			reference->,
		}
	}
`;
// altText,
// title,
export const image = `
	asset->{
		...,
		url,
		extension,
		mimeType
	},
	alt,
	caption,
`;
export const figure = `
	...,
	image{
		asset->
	},
	caption,
	link->{
		_type,
		slug
	}
`;

export const projectCard = `
	_id,
  _type,
  slug,
  title,
	type,
	programme,
	year,
	city,
	zip,
	numbers,
	client,
	imageCover{
		${image}
	}
`;
