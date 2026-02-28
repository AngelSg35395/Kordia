
import asyncio
from app.services.youtube_service import YouTubeService

async def test_search():
    svc = YouTubeService()
    results = await svc.search("spill me", max_results=1)
    for res in results:
        print(f"Title: {res['title']}")
        print(f"Thumbnail: {res['thumbnail']}")
    
    # Debug full entries
    ydl_opts = {'extract_flat': True, 'default_search': 'ytsearch'}
    import yt_dlp
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info("ytsearch1:spill me", download=False)
        print("Full entry data:")
        import json
        print(json.dumps(info['entries'][0], indent=2))

if __name__ == "__main__":
    asyncio.run(test_search())
