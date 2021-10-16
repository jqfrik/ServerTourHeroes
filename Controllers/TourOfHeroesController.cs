using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TourHeroesServer.Model;

namespace TourHeroesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourOfHeroesController : ControllerBase
    {
        List<Hero> heroes { get; set; }
        public TourOfHeroesController()
        {
            List<string> names = new List<string>() { "qwerty", "bezos", "jack ma", "alibaba" };
            int outerId = 1;
            heroes = names.Select((name) => {
                Hero hero = new Hero() { Id = outerId, Name = name };
                ++outerId;
                return hero;
            }).ToList();
        }
        [HttpGet]
        [Route("GetAllHeroes")]
        public List<Hero> GetAllHeroes()
        {
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return heroes;
        }

        [HttpGet]
        [Route("GetHero/{id}")]
        public Hero GetHero([FromRoute]int id)
        {
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Hero hero = heroes.Find(hero => hero.Id == id);
            if(hero != null)
            {
                return hero;
            }
            return new Hero();
        }
        [HttpPost]
        [Route("UpdateHero")]
        public Hero UpdateHero([FromBody] Hero heroRequest)
        {
            Hero hero = heroes.Find((e) =>
            {
                return e.Id == heroRequest.Id;
            });
            if (hero != null)
            {
                heroes[hero.Id - 1] = heroRequest;
            }
            return heroRequest;
        }
        [HttpGet]
        [Route("RemoveHero/{id}")]
        public List<Hero> RemoveHero([FromRoute] int id)
        {
            if(id >= 0 && id < heroes.Count)
            {
                heroes.RemoveAt(id);
            }
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return heroes;
        }
    }
}
