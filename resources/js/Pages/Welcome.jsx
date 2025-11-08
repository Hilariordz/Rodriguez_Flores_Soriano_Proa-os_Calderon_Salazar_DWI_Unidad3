import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="BonAppétit Web - Restaurante Elegante">
                <link rel="icon" type="image/png" href="/images/BonAppétit-logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&display=swap" rel="stylesheet" />
            </Head>

            <section className="relative min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/hero-poster.jpg"
                    >
                        <source src="/videos/hero.mp4" type="video/mp4" />
                        <source src="https://www.pexels.com/es-es/download/video/5498709/" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                </div>

                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 transition-all duration-300">
                    <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img src="/images/BonAppétit-logo.png" alt="BonAppétit Logo" className="h-8 sm:h-10" />
                            <span className="text-white text-xl sm:text-2xl font-serif tracking-wider">BonAppétit</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="relative overflow-hidden px-4 sm:px-6 py-2 text-sm sm:text-base text-white font-medium transition-all duration-300 group hover:text-black"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                                    <span className="relative z-10">Dashboard</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="relative overflow-hidden px-4 sm:px-6 py-2 text-sm sm:text-base text-white font-medium transition-all duration-300 group hover:text-black"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                                        <span className="relative z-10">Iniciar Sesión</span>
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="relative overflow-hidden px-4 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium transition-all duration-300 group hover:from-yellow-400 hover:to-yellow-500 shadow-lg hover:shadow-yellow-500/25"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                                        <span className="relative z-10">Registrarse</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <div className="relative z-10 text-center text-white px-4 sm:px-6 pt-20">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl mb-6" style={{ fontFamily: "'Ballet', cursive" }}>Bienvenidos</h1>
                    <p className="text-base sm:text-lg mb-8 max-w-md mx-auto">Descubre el arte culinario en su máxima expresión</p>
                    <Link
                        href={route('dashboard')}
                        className="relative overflow-hidden inline-block bg-transparent border-2 border-white text-white px-8 py-3 font-medium transition-all duration-300 group hover:text-black hover:border-yellow-400"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10">EXPLORAR MENÚ</span>
                    </Link>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-4xl font-serif mb-4 sm:mb-6 text-gray-800">Descubre</h3>
                            <h2 className="text-3xl sm:text-5xl font-serif mb-6 sm:mb-8 text-gray-900">NUESTRA HISTORIA</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">Desde 1985, BonAppétit ha sido sinónimo de excelencia culinaria. Nuestros chefs combinan técnicas tradicionales con innovación moderna para crear experiencias gastronómicas inolvidables.</p>
                            <p className="text-gray-600 leading-relaxed mb-8">Cada plato cuenta una historia, cada ingrediente es seleccionado cuidadosamente para ofrecerte lo mejor de la alta cocina.</p>
                            <button className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors">LEER MÁS</button>
                        </div>
                        <div className="h-96 rounded overflow-hidden">
                            <img 
                                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" 
                                alt="Historia del Restaurante" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div className="h-64 sm:h-96 rounded overflow-hidden order-2 md:order-1">
                            <img 
                                src="https://images.pexels.com/photos/32825909/pexels-photo-32825909.jpeg" 
                                alt="Platos Signature" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h3 className="text-2xl sm:text-4xl font-serif mb-4 sm:mb-6">Deliciosas</h3>
                            <h2 className="text-3xl sm:text-5xl font-serif mb-6 sm:mb-8">RECETAS</h2>
                            <p className="text-gray-300 leading-relaxed mb-8">Nuestras recetas signature han sido perfeccionadas durante décadas. Cada plato refleja nuestra pasión por la excelencia y nuestro compromiso con los sabores auténticos.</p>
                            <Link href={route('dashboard')} className="inline-block bg-yellow-600 text-black px-8 py-3 hover:bg-yellow-500 transition-colors">VER RECETAS</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-5xl font-serif mb-6 sm:mb-8 text-gray-900">Nuestro</h2>
                            <h2 className="text-3xl sm:text-5xl font-serif mb-6 sm:mb-8 text-gray-900">MENÚ</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">Explora nuestra selección cuidadosamente curada de platos gourmet. Desde entrantes exquisitos hasta postres decadentes, cada elemento de nuestro menú está diseñado para deleitar tus sentidos.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 rounded overflow-hidden">
                                <img 
                                    src="https://images.pexels.com/photos/1199956/pexels-photo-1199956.jpeg" 
                                    alt="Plato 1" 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="h-32 rounded overflow-hidden">
                                <img 
                                    src="https://images.pexels.com/photos/32318143/pexels-photo-32318143.jpeg" 
                                    alt="Plato 2" 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="h-32 rounded overflow-hidden">
                                <img 
                                    src="https://images.pexels.com/photos/29138862/pexels-photo-29138862.jpeg" 
                                    alt="Plato 3" 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <div className="h-32 rounded overflow-hidden">
                                <img 
                                    src="https://images.pexels.com/photos/5490895/pexels-photo-5490895.jpeg" 
                                    alt="Plato 4" 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h3 className="text-2xl sm:text-4xl font-serif mb-4 sm:mb-6">Perfecta</h3>
                    <h2 className="text-3xl sm:text-5xl font-serif mb-8 sm:mb-12">COMBINACIÓN</h2>
                    <div className="h-48 sm:h-64 rounded overflow-hidden mb-8">
                        <img 
                            src="https://images.pexels.com/photos/33097102/pexels-photo-33097102.jpeg" 
                            alt="Perfecta Combinación" 
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-5xl font-serif mb-6 sm:mb-8 text-gray-900">DELEITE</h2>
                            <p className="text-gray-600 leading-relaxed mb-8">Experimenta el placer de una cena excepcional. Nuestro ambiente elegante y nuestro servicio impecable crean el escenario perfecto para momentos inolvidables.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <div className="w-full sm:w-48 h-64 sm:h-96 rounded overflow-hidden shadow-lg">
                                <img 
                                    src="https://images.pexels.com/photos/28992205/pexels-photo-28992205.jpeg" 
                                    alt="Ambiente del Restaurante 1" 
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="hidden sm:flex flex-col gap-4">
                                <div className="w-48 h-46 rounded overflow-hidden shadow-lg">
                                    <img 
                                        src="https://images.pexels.com/photos/3298179/pexels-photo-3298179.jpeg" 
                                        alt="Ambiente del Restaurante 2" 
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <div>
                            <h3 className="text-xl font-serif mb-4">UBICACIONES</h3>
                            <p className="text-gray-400 mb-2">Ciudad de México</p>
                            <p className="text-gray-400 mb-2">Polanco - Av. Masaryk 123</p>
                            <p className="text-gray-400">Tel: +52 55 1234 5678</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif mb-4">HORARIOS</h3>
                            <p className="text-gray-400 mb-2">Lunes - Jueves: 6:00 PM - 11:00 PM</p>
                            <p className="text-gray-400 mb-2">Viernes - Sábado: 6:00 PM - 12:00 AM</p>
                            <p className="text-gray-400">Domingo: 6:00 PM - 10:00 PM</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif mb-4">CONTACTO</h3>
                            <p className="text-gray-400 mb-2">reservas@bonappetit.com</p>
                            <p className="text-gray-400 mb-2">Síguenos en redes sociales</p>
                            <p className="text-gray-400">@BonAppetitMX</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 BonAppétit Web. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
