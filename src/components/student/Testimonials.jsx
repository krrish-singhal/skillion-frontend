import React, { useState } from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import { FiChevronLeft, FiChevronRight, FiAward } from "react-icons/fi";

const Testimonials = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const nextTestimonial = () => {
		setActiveIndex((prev) => (prev + 1) % dummyTestimonial.length);
	};

	const prevTestimonial = () => {
		setActiveIndex((prev) => 
			prev === 0 ? dummyTestimonial.length - 1 : prev - 1
		);
	};

	return (
		<div className="py-20 px-8 md:px-16 bg-linear-to-b from-white to-yellow-50">
			{/* Header */}
			<div className="max-w-7xl mx-auto text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
					Success Stories
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Real learners. Real results. See how Skillion has transformed careers and opened doors to opportunities at top companies worldwide.
				</p>
			</div>

			{/* Featured Testimonial */}
			<div className="max-w-6xl mx-auto mb-16">
				<div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
					<div className="flex flex-col md:flex-row gap-8 items-center">
						{/* Profile Section */}
						<div className="shrink-0 text-center md:text-left">
							<div className="relative inline-block">
								<img 
									className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500" 
									src={dummyTestimonial[activeIndex].image} 
									alt={dummyTestimonial[activeIndex].name} 
								/>
								<div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
									<FiAward className="w-6 h-6 text-white" />
								</div>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mt-4">
								{dummyTestimonial[activeIndex].name}
							</h3>
							<p className="text-yellow-600 font-semibold mt-1">
								{dummyTestimonial[activeIndex].role}
							</p>
							<div className="flex gap-1 mt-3 justify-center md:justify-start">
								{[...Array(5)].map((_, i) => (
									<img 
										className="h-5" 
										key={i} 
										src={i < Math.floor(dummyTestimonial[activeIndex].rating) ? assets.star : assets.star_blank} 
										alt="star" 
									/>
								))}
							</div>
						</div>

						{/* Content Section */}
						<div className="flex-1">
							<div className="mb-6">
								<span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">
									{dummyTestimonial[activeIndex].achievement}
								</span>
							</div>
							<p className="text-gray-700 text-lg leading-relaxed mb-6">
								"{dummyTestimonial[activeIndex].feedback}"
							</p>
							
							{/* Navigation */}
							<div className="flex items-center gap-4">
								<button 
									onClick={prevTestimonial}
									className="p-2 rounded-full border-2 border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all"
									aria-label="Previous testimonial"
								>
									<FiChevronLeft className="w-6 h-6 text-gray-700" />
								</button>
								<button 
									onClick={nextTestimonial}
									className="p-2 rounded-full border-2 border-gray-300 hover:border-yellow-500 hover:bg-yellow-50 transition-all"
									aria-label="Next testimonial"
								>
									<FiChevronRight className="w-6 h-6 text-gray-700" />
								</button>
								<span className="text-sm text-gray-600 ml-2">
									{activeIndex + 1} of {dummyTestimonial.length}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* All Testimonials Grid */}
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{dummyTestimonial.map((testimonial, index) => (
						<div 
							key={index} 
							className={`group cursor-pointer bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden hover:shadow-lg ${
								index === activeIndex 
									? 'border-yellow-500 shadow-lg' 
									: 'border-gray-200 hover:border-yellow-300'
							}`}
							onClick={() => setActiveIndex(index)}
						>
							{/* Header */}
							<div className="bg-linear-to-r from-yellow-50 to-white p-6 border-b border-gray-100">
								<div className="flex items-center gap-4">
									<img 
										className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500" 
										src={testimonial.image} 
										alt={testimonial.name} 
									/>
									<div className="flex-1">
										<h4 className="text-lg font-bold text-gray-900">
											{testimonial.name}
										</h4>
										<p className="text-sm text-gray-600">{testimonial.role}</p>
									</div>
								</div>
								<div className="flex gap-0.5 mt-3">
									{[...Array(5)].map((_, i) => (
										<img 
											className="h-4" 
											key={i} 
											src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
											alt="star" 
										/>
									))}
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="mb-3">
									<span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
										{testimonial.achievement}
									</span>
								</div>
								<p className="text-gray-600 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-700">
									{testimonial.feedback}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Stats Section */}
			<div className="max-w-5xl mx-auto mt-20">
				<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="text-4xl font-bold text-yellow-600 mb-2">50K+</div>
							<div className="text-gray-600 font-medium">Active Learners</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-yellow-600 mb-2">95%</div>
							<div className="text-gray-600 font-medium">Success Rate</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-yellow-600 mb-2">4.9/5</div>
							<div className="text-gray-600 font-medium">Average Rating</div>
						</div>
						<div>
							<div className="text-4xl font-bold text-yellow-600 mb-2">200+</div>
							<div className="text-gray-600 font-medium">Expert Courses</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Testimonials;