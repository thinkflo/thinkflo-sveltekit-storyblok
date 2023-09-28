<script>
	import {
		storyblokEditable,
		StoryblokComponent,
		renderRichText
	} from '@storyblok/svelte';
	import { hasRichText } from "$lib/utils/blokData";
	import { fade } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import Constrained_Width from '$lib/Components/UI/Constrained_Width.svelte';
	import Heading from '$lib/Components/UI/Heading.svelte';

	export let blok;
	export let selection = "all";
	let articles = [...blok?.allArticles];

	$: {
		if(selection && selection !== "all") {
			articles = [...blok?.allArticles.filter((article) => article.content.Category.includes(selection))]
		} else {
			articles = [...blok?.allArticles];
		}
	}

	const handleSelection = (event) => {
		selection = event.target.dataset.value;
	};
</script>

<article use:storyblokEditable={blok} class="bg-white dark:bg-black">
	<section class="py-12 md:py-24">
		<Constrained_Width className="flex flex-col lg:flex-row">
			<div class="space-y-4 lg:w-3/12">
				<Heading className="text-3xl font-extralight uppercase" isFirst={true}>Filters</Heading>

				<ul
				class="categories relative mb-7 flex overflow-x-auto font-thin uppercase scrollbar-hide lg:m-0 lg:w-fit lg:flex-col lg:space-y-3 lg:px-3 lg:justify-start"
				>
					<li
						class:text-jaffa-400={"all" === selection}
						class="mr-4 min-h-[3rem] list-none text-center lg:min-h-0 lg:text-left"
					>
						<button on:click={handleSelection} data-value="all">
							All
						</button>
					</li>
					{#each blok.filters as category}
						<li
							class:text-jaffa-400={category.name === selection}
							class="mr-4 min-h-[3rem] list-none text-center lg:min-h-0 lg:text-left"
						>
							<button class="whitespace-nowrap" on:click={handleSelection} data-value={category.name}>
								{category.name}
							</button>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Work Panels -->
			<div class="pt-4 lg:pt-0 lg:pl-4 grid md:grid-cols-2 w-full gap-4">
				{#each articles as article}
					<a
						in:fade={{ delay: 50, duration: 1000, easing: quintOut }}
						out:fade={{ delay: 0, duration: 42, easing: quintOut }}
						data-sveltekit-reload
						href={article?.full_slug}
						class="group/work flex flex-col justify-center space-y-4 bg-gray-800 px-8 py-12 relative overflow-hidden cursor-pointer aspect-video"
					>
						<picture>
							<img
								sizes="100vw"
								class="absolute inset-0 h-full w-full object-cover group-hover/work:scale-110 transition duration-300 ease-in-out"
								src={article?.content?.Image?.filename || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEYCAYAAACqUARzAAAAAXNSR0IArs4c6QAAGb9JREFUeF7t3YfS47ahBlA5dtx7d9x7iXve/w3ixN1x773GPXHLfP9EGS4WlCgJWniRw5nM3OufAoQDzH4kCELn/PWvf/1t5SBAgAABAgTOaoFzBPpZ3X++PAECBAgQOBEQ6AYCAQIECBAYQECgD9CJmkCAAAECBAS6MUCAAAECBAYQEOgDdKImECBAgAABgW4MECBAgACBAQQE+gCdqAkECBAgQECgGwMECBAgQGAAAYE+QCdqAgECBAgQEOjGAAECBAgQGEBAoA/QiZpAgAABAgQEujFAgAABAgQGEBDoA3SiJhAgQIAAAYFuDBAgQIAAgQEEBPoAnagJBAgQIEBAoBsDBAgQIEBgAAGBPkAnagIBAgQIEBDoxgABAgQIEBhAQKAP0ImaQIAAAQIEBLoxQIAAAQIEBhAQ6AN0oiYQIECAAAGBbgwQIECAAIEBBAT6AJ2oCQQIECBAQKAbAwQIECBAYAABgT5AJ2oCAQIECBAQ6MYAAQIECBAYQECgD9CJmkCAAAECBAS6MUCAAAECBAYQEOgDdKImECBAgAABgW4MECBAgACBAQQE+gCdqAkECBAgQECgGwMECBAgQGAAAYE+QCdqAgECBAgQEOjGAAECBAgQGEBAoA/QiZpAgAABAgQEujFAgAABAgQGEBDoA3SiJhAgQIAAAYFuDBAgQIAAgQEEBPoAnagJBAgQIEBAoBsDBAgQIEBgAAGBPkAnagIBAgQIEBDoxgABAgQIEBhAQKAP0ImaQIAAAQIEBLoxQIAAAQIEBhAQ6AN0oiYQIECAAAGBbgwQIECAAIEBBAT6AJ2oCQQIECBAQKAbAwQIECBAYAABgT5AJ2oCAQIECBAQ6MYAAQIECBAYQECgD9CJmkCAAAECBAS6MUCAAAECBAYQEOgDdKImECBAgAABgW4MECBAgACBAQQE+gCdqAkECBAgQECgGwMECBAgQGAAAYE+QCdqAgECBAgQEOjGAAECBAgQGEBAoA/QiZpAgAABAgQEujFAgAABAgQGEBDoA3SiJhAgQIAAAYFuDBAgQIAAgQEEBPoAnagJBAgQIEBAoBsDBAgQIEBgAAGBPkAnagIBAgQIEBDoxgABAgQIEBhAQKAP0ImaQIAAAQIEBLoxQIAAAQIEBhAQ6AN0oiYQIECAAAGBbgwQIECAAIEBBAT6AJ2oCQQIECBAQKAbAwQIECBAYAABgT5AJ2oCAQIECBAQ6MYAAQIECBAYQECgD9CJmkCAAAECBAS6MUCAAAECBAYQEOgDdKImECBAgAABgW4MECBAgACBAQQE+gCdqAkECBAgQECgGwMECBAgQGAAAYE+QCdqAgECBAgQEOjGAAECBAgQGEBAoA/QiZpAgAABAgQEujFAgAABAgQGEBDoA3SiJhAgQIAAAYFuDBAgQIAAgQEEBPoAnagJBAgQIEBAoBsDBAgQIEBgAAGBPkAnagIBAgQIEBDoxgABAgQIEBhAQKAP0ImaQIAAAQIEBLoxQIAAAQIEBhAQ6AN0oiYQIECAAAGBbgwQIECAAIEBBAT6AJ2oCQQIECBAQKAbAwQIECBAYAABgT5AJ2oCAQIECBAQ6MYAAQIECBAYQECgD9CJmkCAAAECBAS6MUCAAAECBAYQEOgDdKImECBAgAABgW4MECBAgACBAQQE+gCdqAkECBAgQECgGwMECBAgQGAAAYE+QCdqAgECBAgQEOjGAAECBAgQGEBAoA/QiZpAgAABAgQEujFAgAABAgQGEBDoA3SiJhAgQIAAAYFuDBAgQIAAgQEEBPoAnagJBAgQIEBAoBsDBAgQIEBgAAGBPkAnagIBAgQIEBDoxgABAgQIEBhAQKAP0ImaQIAAAQIEBLoxQIAAAQIEBhAQ6AN0oiYQIECAAAGBbgwQIECAAIEBBAT6AJ2oCQQIECBAQKAbAwQIECBAYAABgT5AJ2oCAQIECBAQ6MYAAQIECBAYQECgD9CJmkCAAAECBAS6MfB/LfDHP/5xdemll64uvvji1bnnnrv6+eefVz/88MPqm2++Ofm/9z1S1iWXXHLyv9Tx66+/rn788ceTcv/1r3/tW+xZ87k//OEPq2uuuWZ14YUXrs4///xV/v+0+7vvvjsx+Pe//71XW84555yTvpr2Wfrr+++/X3377bern376aa9y86FjjYW9v5APEthRQKDvCOb0MyPw4IMPnvzDvc/x2Wefrd5+++2NH03Zd95550ngzB0JiXffffckKJYe55133uqOO+5YXXHFFbMfSeh8+OGHq08//XRpsWfNefG86667VhdddNHW7/zxxx+v3nvvva3n5YRcEMT1qquu2nh+bN94442d+uxYY2FRw5xEoKGAQG+Iqah2Ao899tgq4bjP8cUXX6zefPPN2Y/+6U9/Wt10002Li/7ggw9OAnjbcdlll63uu+++baf97+9ff/316rXXXlv99ttviz/zez7xhhtuWN1yyy07fcXcqb/yyisbZy0S4gnzhPrSI7avvvrq1tOPNRa2VuwEAkcQEOhHQFXk4QJPPvnkKtOr+xybAv36669f3XrrrTsX+/77768++uij2c/lLu+BBx7Y+Tvn7v/ll1/e+fv83j5w5ZVXru6+++69vlYeRzzzzDMnjyXKI9P1jzzyyF7lbpupOdZY2OvL+hCBBgICvQGiItoK5Pnz448/vnehn3zyyclUeXlccMEFq4cffvi0/54gybPdhOv02Wx54gsvvHDyHLx25Pvme0+P3Hnn/NwtJphSdp7Tlke+a77z2XrkzjntLy/A1u2Pa55zZzo+jyLSD+Xx1VdfrV5//fXT/nv6qzw/5X755Zcnz81zZHo/FxSlf/6WGZB//vOfZ3QsnK396Huf/QIC/ezvw+FakH/077nnnv+1K/9457nooUemwzMtPj0SCi+99NJpReduMyExPRL6//jHP047tzbVnIuEZ599dvXLL7+ccn4WimX6eHrk3L///e+HNq/b52+88cbVzTfffFqbnn/++eoitbk74xdffPEk+NdH7a4/F0jpr/JuPhcT6bNy7cJc/x5rLHTrBBUTWK1WAt0w+N0J5Pl2nm2uj23T3UsaULs7zwKq5557bvYZ9qOPPnrKHXXuDBO85TPv8u48f084zd3N1y4W8hw5q7/PxiNT4pmBWB9pf2YzNq3mv/3221fXXnvtKc3NIsF33nnnf/+tdk4ukjatZC/7rHaxdMyxcDb2n+88joBAH6cvh2lJVklPVzO3CLvbbrttdd11151ilDu99bRtDS9TuQ899NApf8rq+TybXR+ZRr///vtPOWfJ6u1yjUCmhTM9vOuRu9hy1iFT/LVp5mnZ8c13T+DlfwnhTHvPXYRs+l5/+ctfdm5/PlAalDMgsZ+uls/dey6UNh21RW5/+9vfTrkIO9ZY2LXvnE+gtYBAby2qvIMFyn/Iy3+Q96ngz3/+8ymvqC2d5n7iiSdOWV1dTuFmgV2mkKdH7vq3vWddvpaXQE07dz2yqjxT/tMjZeU7zN3Jzq0l2HaBU/tutbK23UWvyynv7PPefxbHrY/ybnvJAsLa44+nnnrqlK9+rLGwa985n0BrAYHeWlR5BwtMX1nbN+jKL1HeDS59rakM3vJCoAyHPDN/+umntxrU7iTzzHmfTWfKYEzlc8+O87faQrNyuntrA/57QrneYZf+Kr9HaZeZj8wirI8y8GvfsXw2XrtwO9ZYWGrmPALHEhDox5JV7t4C039wc6ebu828k56p5fwvq6Xz3zNFm2DeFoJ5pSzBPD3ynnpeb9t21IJ3esdXhsPcau2ynrQhFwPTI+9Npz27HnN33OXjgZRba8/aeNd6c36m7vOIZJfQXZ+7z+xHXh3Mmoracfnll6/uvffeU/5UTtMfcyzs4+czBFoKCPSWmso6WKB8ZS3TxlnBvGmTmdyFZTHV559/Xq2/trJ80yto00LKwMrfsjBuvcq6fH6cDWiyEc2So/xs2rDv7nG1lea5W84U9nql/Vzw7zszsKSNc+fUpsbL98YzFjJbU74Ol4uet95665RHCrVHH6k7byXkwm99HHMsHOLhswRaCAj0ForKaCZQu8taWnjuxnKXWz47roXHNJQ3lV9b9La+GMhFRgJneuzyTnkZ6JvuPpcYlGsP8pnpc+faVHu2Xs0ivjN51GYnUn9t8WNWwme1e+1Yv20wtwFRbYOhY42FM+mnLgJzAgLd2PhdCdTuNHf5gnnOmkVZ01fLagvHyoVSc3XU7mrXm5XUpm+zOUqm3Zcc5ZTzti1rt5WZTWvyPL0MuLzDnxCdvgqYsjY9Z99W175/z4xH9tCv3XXPbdUa5zwbr20cM/c95mZKjjUW9vXwOQItBQR6S01lHSxQvrK2LnD9zDyvYyWsc+d89dVXV/+RL59jJ0By7vrYZeFWgifPyafHemq8XBCWc3ZZKV6+v750od4m5Nodbdpb28UtFz6H/KLcLp2dMM779+Urdilj09av+XteN8yU+i5bAWddRS4QyvUVxxoLu1g4l8CxBAT6sWSVu5dA7VfWNk1jzz07nW75WW7ksvSVtXUDyqnxPL/N8/pcJCQgpseSV9bW55c/QLPvu+gldPaUz8+2bjpy154d+M7EkVmXzA7UAjl9kb3sa/sBZEvZ3Jlva8umNpRbvx5rLJwJR3UQ2CYg0LcJ+fsZFcimH7mLyz/mCYDcDW+bwi7vuvKFp3e75UYiu9yh1/aVXz/rrT1fP+QOfduPiSztiHznvMM99+tkLWYClnyXrIfINre1/evz+YR4LMvtcddlZ8V6yiiPXPjk2f96E5yUn7v4XDiUFw0pOwsD149gjjUWlng4h8CxBQT6sYWVf0YEyunrLIzLlHKO2nP5pc/Qa7/2tb4Lry2K2+XVs/IZ+tKfaV0CWludn8/ljjjvyR/zJ1tzIZEwnr5DPv3O295KyLk12/z3ctX6tNzUm1cBp9vQ5u/Td+yPNRaW9IlzCBxbQKAfW1j5Z0SgvJub3oXXwm1poNdW3U8/Ozcdv6TRh3x2W/lzv82+ZHOWbWVv+nu8Mq09NzuQhX95ZLHtgqL2KGXJK4EJ86zmn96p5zl6Xs3LccyxcIibzxJoISDQWygqo7tAfu0rd1/TY71lbG01evnLXnMN2LaVaLmxzJJ93OfuQFvsWZ+yE2Z5Pj+3KjzP/xOqrY/apjXrOvL6XDbz2bYl7vr82q+hLb0IK3eYm66ZOOZYaO2pPAK7Cgj0XcWc/7sUKAN9eoeeu8VMb0+PJXd7Ob9cdV/e4ZZT/UtfBavdKWYqfO558i7o+enZ8mdEy89nIVpCttVRWyCYsvPoIwvwdq2rfGd+l5mF2t39+mLgmGOhlaVyCOwrIND3lfO55gIJ5ekiqKzCzmYrS45yyr0MgPJ59dxvm5d1lT8QUv42e7mifOkK+vJCYfrMf0l7586Ze3Zenl8uFjukztqv0qW8Q2YCyj3ydwn0TRd3+V7HGguHGPosgRYCAr2FojKaCCz5YY1aRZlizp3y9LltGdjl60pzv20+Lb+2IK6cFq/dmS65+y3v7FuscJ9b3Z6V93kTIJvLTI+l+85v69zaa3KH7npXe3Nh6a/ulRd35cXSscbCNid/J3BsAYF+bGHlLxbIz5BmunR6LAnHJQuoas9Otz3vLi8w5l53K5+jb/vd7tpz+aXP9Ddh1oJ1fZdcuzhJWeV72os7678n1jbeaXGhUNsgZ8kdf+2i5ptvvjl5PW59HHMs7OrnfAItBQR6S01lHSRQe+d708Yjqaz2D//ctHe5kUs+P7cQrbZj3dzGL7X3pefuUGvfd5fp5DngWrnltHrtla1tu7Rt69DaRdjSffI3lZ13y/O4ozw2ba2bi4tsTJRHANOj9qM3xxoL27z8ncAxBQT6MXWVvbNA+ex0XUDeJc6dX+628g93XsvKZiK1xV/rndzKym+66abT9jPPOSk7i+QSbplCTzjmLm56lL9cNv1b7Y4vf893zS532QAl3zO/9HXllVeeZnLoXfLcHu61d+JrvuUd7C6dVq4oz2f3XdiXxyTT/dznFvfl++aCKeenrsw+pN/Sv+XrcrHPj+mcqbGwi51zCbQWEOitRZV3kEDu0vMDI7v8EMe0wrl/wNfnzF0wbPvS236VbG4L2m3lHhKm67Jrv7I2txvc3NT73EXQtu9fLhrcdv6mv9d+l/3Q8jdtxXussXCIgc8SOERAoB+i57NHEcjirYTULj/GkS+y5NfKsgNZyp7bjrTWoG3P2tefmduqdA4pr7hl57Ntm6xsQt5nGr02U5HvsM+PtZQrxg8ZELVAzwVI+mvXC7y0JxcpGRNzxzHHwiEOPktgXwGBvq+czx1VIFOn2Xc7U6nbgj1T5XnXOc+4lxwpL9O5tX3Cp59Pubkzz5T80iObq9T2FJ9+PmGz3jFtablz55UL8nJeNnDZFGQ5p/bb6PssZit3uzukPdMd3cpyYlqbUq/Vl1mPPGtfMvV/zLFwiIXPEthHQKDvo+YzZ0wgd2Z59pxf3Mqde+6q8hpSptazWUn+t/6Rjl2/VMpKAOcZeO4E8497FqjlTjHvm+dVsn2OlJOV7HlunpmAtCHhsv4J2PXz+n3K/n/+TFyzvmE9FtZ7tsc2YyAzHrmoq/1y2za3Y42FbfX6O4GWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoKCPSWmsoiQIAAAQKdBAR6J3jVEiBAgACBlgICvaWmsggQIECAQCcBgd4JXrUECBAgQKClgEBvqaksAgQIECDQSUCgd4JXLQECBAgQaCkg0FtqKosAAQIECHQSEOid4FVLgAABAgRaCgj0lprKIkCAAAECnQQEeid41RIgQIAAgZYCAr2lprIIECBAgEAnAYHeCV61BAgQIECgpYBAb6mpLAIECBAg0ElAoHeCVy0BAgQIEGgpINBbaiqLAAECBAh0EhDoneBVS4AAAQIEWgoI9JaayiJAgAABAp0EBHoneNUSIECAAIGWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoKCPSWmsoiQIAAAQKdBAR6J3jVEiBAgACBlgICvaWmsggQIECAQCcBgd4JXrUECBAgQKClgEBvqaksAgQIECDQSUCgd4JXLQECBAgQaCkg0FtqKosAAQIECHQSEOid4FVLgAABAgRaCgj0lprKIkCAAAECnQQEeid41RIgQIAAgZYCAr2lprIIECBAgEAnAYHeCV61BAgQIECgpYBAb6mpLAIECBAg0ElAoHeCVy0BAgQIEGgpINBbaiqLAAECBAh0EhDoneBVS4AAAQIEWgoI9JaayiJAgAABAp0EBHoneNUSIECAAIGWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoKCPSWmsoiQIAAAQKdBAR6J3jVEiBAgACBlgICvaWmsggQIECAQCcBgd4JXrUECBAgQKClgEBvqaksAgQIECDQSUCgd4JXLQECBAgQaCkg0FtqKosAAQIECHQSEOid4FVLgAABAgRaCgj0lprKIkCAAAECnQQEeid41RIgQIAAgZYCAr2lprIIECBAgEAnAYHeCV61BAgQIECgpYBAb6mpLAIECBAg0ElAoHeCVy0BAgQIEGgpINBbaiqLAAECBAh0EhDoneBVS4AAAQIEWgoI9JaayiJAgAABAp0EBHoneNUSIECAAIGWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoKCPSWmsoiQIAAAQKdBAR6J3jVEiBAgACBlgICvaWmsggQIECAQCcBgd4JXrUECBAgQKClgEBvqaksAgQIECDQSUCgd4JXLQECBAgQaCkg0FtqKosAAQIECHQSEOid4FVLgAABAgRaCgj0lprKIkCAAAECnQQEeid41RIgQIAAgZYCAr2lprIIECBAgEAnAYHeCV61BAgQIECgpYBAb6mpLAIECBAg0ElAoHeCVy0BAgQIEGgpINBbaiqLAAECBAh0EhDoneBVS4AAAQIEWgoI9JaayiJAgAABAp0EBHoneNUSIECAAIGWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoKCPSWmsoiQIAAAQKdBAR6J3jVEiBAgACBlgICvaWmsggQIECAQCcBgd4JXrUECBAgQKClgEBvqaksAgQIECDQSUCgd4JXLQECBAgQaCkg0FtqKosAAQIECHQSEOid4FVLgAABAgRaCgj0lprKIkCAAAECnQQEeid41RIgQIAAgZYCAr2lprIIECBAgEAnAYHeCV61BAgQIECgpYBAb6mpLAIECBAg0ElAoHeCVy0BAgQIEGgpINBbaiqLAAECBAh0EhDoneBVS4AAAQIEWgoI9JaayiJAgAABAp0EBHoneNUSIECAAIGWAgK9paayCBAgQIBAJwGB3gletQQIECBAoKWAQG+pqSwCBAgQINBJQKB3glctAQIECBBoKSDQW2oqiwABAgQIdBIQ6J3gVUuAAAECBFoK/Ad01wIVy3BDrAAAAABJRU5ErkJggg=="}
								alt="background"
							/>
							<div
								class="bg-gray-500 top-0 left-0 h-full w-full z-5 absolute opacity-80 group-hover/work:opacity-0 transition-opacity duration-300 ease-in-out"
							/>
						</picture>
						<div
							class="z-10 opacity-1000 group-hover/work:opacity-0 transition-opacity duration-300 ease-in-out"
						>
							<h3 class="text-3xl text-white font-semibold">
								{article.content.Title || article.content.Heading || article.name}
							</h3>
							<div class="prose line-clamp-2 text-white">
								{@html hasRichText(article.content.Blurb) ? renderRichText(article.content.Blurb) : renderRichText(article.content.Description)}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</Constrained_Width>
	</section>

	{#each blok.Content_Blocks as component}
		<StoryblokComponent blok={component} />
	{/each}
</article>

