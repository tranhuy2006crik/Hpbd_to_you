import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)
  const [showHearts, setShowHearts] = useState(false)
  const [currentPlaying, setCurrentPlaying] = useState(null)

  const correctPassword = '05122007'

  // Danh sách nhạc yêu thích (có thể thay đổi theo sở thích)
  const favoriteSongs = [
    {
      id: 1,
      title: 'Nhiều Hơn',
      youtubeId: 'zylC5TE9jrk',
      artist: 'Low G'
    },
    {
      id: 2,
      title: 'In Love',
      youtubeId: 'T7ksmtaVeOk',
      artist: 'Low G, JustaTee'
    },
    {
      id: 3,
      title: 'Love Game',
      youtubeId: 'bMmIAaMcWsU',
      artist: 'Low G, tlinh'
    },
    {
      id: 4,
      title: 'Không Yêu Em Thì Yêu Ai',
      youtubeId: 'o-2yt0ZZZ6o',
      artist: 'Vũ. ft. Low G'
    },
    {
      id: 5,
      title: 'Dancing In The Dark',
      youtubeId: 'OZmK0YuSmXU',
      artist: 'SOOBIN'
    }
  ]
  

  const handleSongClick = (songId) => {
    if (currentPlaying === songId) {
      setCurrentPlaying(null) // Tắt nếu đang phát
    } else {
      setCurrentPlaying(songId) // Phát bài nhạc mới
    }
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (password === correctPassword) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Mật khẩu chưa đúng rồi! Em thử lại nhé 💕')
      setPassword('')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Hiệu ứng xuất hiện sau khi load
      setTimeout(() => setShowContent(true), 300)
      setTimeout(() => setShowHearts(true), 800)
    }
  }, [isAuthenticated])

  const createHeart = () => {
    const heart = document.createElement('div')
    heart.className = 'floating-heart'
    heart.style.left = Math.random() * 100 + '%'
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's'
    heart.textContent = '💕'
    document.body.appendChild(heart)
    
    setTimeout(() => {
      heart.remove()
    }, 5000)
  }

  useEffect(() => {
    if (showHearts) {
      const interval = setInterval(createHeart, 800)
      return () => clearInterval(interval)
    }
  }, [showHearts])

  // Màn hình đăng nhập
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-stars"></div>
        <div className="login-stars2"></div>
        <div className="login-stars3"></div>
        
        <div className="login-box">
          <div className="login-icon">🔐</div>
          <h2 className="login-title">Nhập Mật Khẩu</h2>
          <p className="login-subtitle">Để khám phá điều bất ngờ đặc biệt 💝</p>
          
          <form onSubmit={handlePasswordSubmit} className="login-form">
            <div className="password-input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Nhập mật khẩu 8 chữ số"
                className="password-input"
                maxLength={8}
                autoFocus
              />
              <div className="password-dots">
                {[...Array(8)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`password-dot ${i < password.length ? 'filled' : ''}`}
                  ></span>
                ))}
              </div>
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" className="login-button">
              Mở Khóa 💖
            </button>
          </form>
          
          <div className="login-hint">
            <p>💡 Gợi ý: Mật khẩu là một ngày đặc biệt (8 chữ số)</p>
          </div>
        </div>
      </div>
    )
  }

  // Trang chúc mừng sinh nhật
  return (
    <div className="birthday-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className={`content ${showContent ? 'show' : ''}`}>
        <div className="cake-container">
          <div className="cake">
            <div className="candle">
              <div className="flame"></div>
            </div>
            <div className="frosting1"></div>
            <div className="frosting2"></div>
            <div className="frosting3"></div>
            <div className="cake-bottom"></div>
          </div>
        </div>

        <h1 className="title">🎉 Chúc Mừng Sinh Nhật! 🎉</h1>
        
        <div className="message-box">
          <p className="greeting">Gửi đến em, ưu tiên 1 của anh</p>
          <p className="message">
            Hôm nay là một ngày thật là đặc biệt em nhỉ. Ngày này của 18 năm trước, một thiên thần nhỏ đã cập bến thế giới này. Và rồi cũng đã đến lúc mà thiên thần ấy tới tuổi 18 rồi. 
            Hôm nay, anh muốn gửi đến em những lời chúc tốt đẹp nhất!
          </p>
          <p className="wish">
            Chúc em luôn thật xinh đẹp, hạnh phúc và tràn đầy năng lượng em nhé! 
            Mỗi ngày được nói chuyện với em, anh đều cảm thấy đó là một món quà quý giá. 
            Hãy luôn mỉm cười và tỏa sáng như những ngôi sao trên bầu trời em nhé! ✨
            Cảm ơn em vì đã là một phần thật quan trọng trong cuộc đời anh.
          </p>
          <p className="love">💖 Anh chúc em sẽ có một ngày sinh nhật thật vui vẻ và hạnh phúc nhé! 💖</p>
        </div>

        <div className="balloons">
          <div className="balloon balloon1">🎈</div>
          <div className="balloon balloon2">🎈</div>
          <div className="balloon balloon3">🎈</div>
          <div className="balloon balloon4">🎈</div>
          <div className="balloon balloon5">🎈</div>
        </div>

        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              backgroundColor: ['#ff6b9d', '#ffc1cc', '#ffb3d9', '#ff91a4', '#ff69b4'][Math.floor(Math.random() * 5)]
            }}></div>
          ))}
        </div>

        {/* Danh sách nhạc yêu thích */}
        <div className="music-section">
          <h2 className="music-title">🎵 Những Bài Hát Yêu Thích Của Em 🎵</h2>
          <div className="music-list">
            {favoriteSongs.map((song) => (
              <div key={song.id} className="music-item">
                <div 
                  className={`music-card ${currentPlaying === song.id ? 'playing' : ''}`}
                  onClick={() => handleSongClick(song.id)}
                >
                  <div className="music-icon">
                    {currentPlaying === song.id ? '🎵' : '🎶'}
                  </div>
                  <div className="music-info">
                    <h3 className="music-song-title">{song.title}</h3>
                    <p className="music-artist">{song.artist}</p>
                  </div>
                  <div className="music-play-button">
                    {currentPlaying === song.id ? '⏸️' : '▶️'}
                  </div>
                </div>

                {currentPlaying === song.id && (
                  <>
                    <div className="music-disc">
                      <div className="disc-outer">
                        <div className="disc-inner">
                          <span className="disc-label">♫</span>
                        </div>
                      </div>
                      <p className="disc-now-playing">
                        Đang phát: <span>{song.title}</span>
                      </p>
                    </div>

                    {/* Iframe ẩn phát nhạc từ YouTube */}
                    <div className="hidden-audio-player">
                      <iframe
                        width="0"
                        height="0"
                        src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`}
                        title={song.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <p className="music-add-more-text">Em muốn thêm bài gì nữa nè? 💕</p>
        </div>

        {/* Nút nhắn tin Messenger góc phải
        <a
          href="https://m.me/your.messenger.username"
          target="_blank"
          rel="noopener noreferrer"
          className="messenger-floating"
        >
          <div className="messenger-text">
            Nhắn tin cho anh ở đây nhaa
          </div>
          <div className="messenger-arrow">→</div>
          <div className="messenger-icon">
            <span className="messenger-logo">💬</span>
          </div>
        </a> */}
      </div>
    </div>
  )
}

export default App
