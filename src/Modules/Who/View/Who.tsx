import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { createNoise2D } from 'simplex-noise'; // ✨ SimplexNoise hatası giderildi

// GSAP eklentilerini kaydet
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Simplex Noise için fonksiyonu oluştur
const noise2D = createNoise2D();

const CirclesAnimation = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !wrapperRef.current) {
      console.error("DOM elementleri bulunamadı.");
      return;
    }

    const content = contentRef.current;

    // Önceki döngüden kalan daireleri temizle
    content.querySelectorAll('.circle').forEach(circle => circle.remove());

    /*------------------------------
    Making some circles noise
    ------------------------------*/
    const Circles: HTMLElement[] = [];
    const NUM_CIRCLES = 5000;

    // Daireleri oluştur ve DOM'a ekle
    for (let i = 0; i < NUM_CIRCLES; i++) {
      const div = document.createElement('div');
      div.classList.add('circle');
      
      // Simplex Noise ile rastgele değerler oluştur
      const n1 = noise2D(i * 0.003, i * 0.0033);
      const n2 = noise2D(i * 0.002, i * 0.001);
      
      // CSS stillerini hesapla ve uygula
      const style: React.CSSProperties = {
        transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
        boxShadow: `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .6)`,
      };
      Object.assign(div.style, style);
      
      content.appendChild(div);
      Circles.push(div);
    }
    
    // Yeterli kaydırma alanı sağlamak için içeriğin yüksekliğini dinamik olarak ayarlayabilirsiniz.
    // Ancak SCSS'te sabit bir değer (400vh) kullanıldı.

    /*------------------------------
    Init ScrollSmoother
    ------------------------------*/
    const scrollerSmoother = ScrollSmoother.create({
      content: content,
      wrapper: wrapperRef.current,
      smooth: 1,
      effects: false,
      normalizeScroll: true,
    });

    /*------------------------------
    Scroll Trigger Timeline
    ------------------------------*/
    const main = gsap.timeline({
      scrollTrigger: {
        scrub: 0.7,
        start: "top 25%", // Pencere 25%'e ulaştığında başla
        end: "bottom bottom", // Sayfanın sonuna kadar animasyon yap
        trigger: content,
      }
    });
    
    // Tüm daireleri aynı anda görünür hale getir (timeline başlangıcında)
    // Daireler başlangıçta CSS ile `opacity: 0` olarak ayarlanmıştır.
    Circles.forEach((circle) => {
      main.to(circle, {
        opacity: 1,
        duration: 0.01, // Çok sayıda elemanın aynı anda tetiklenmesi için kısa süre
      }, 0); // Timeline'ın başlangıcına (0 konumu) yerleştir
    });

    // Temizleme fonksiyonu: Bileşen kaldırıldığında tüm GSAP nesnelerini temizler
    return () => {
      main.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      scrollerSmoother.kill();
    };

  }, []); // Yalnızca bir kez çalışır

  return (
    <div id="wrapper" ref={wrapperRef}>
      <div id="content" ref={contentRef}>
        <div className="scroll">
          <span>SCROLL</span>
          <svg viewBox="0 0 24 24">
            <line className="st1" x1="12" y1="1" x2="12" y2="22.5" />
            <line className="st1" x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
            <line className="st1" x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
          </svg>
        </div>
        {/* Daireler JavaScript ile DOM'a eklenir */}
      </div>
    </div>
  );
};

export default CirclesAnimation;