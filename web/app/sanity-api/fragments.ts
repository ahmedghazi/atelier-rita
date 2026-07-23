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

export const image = `
	asset->{
		...,
		altText,
		title,
		url,
		extension,
		mimeType
	}
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
