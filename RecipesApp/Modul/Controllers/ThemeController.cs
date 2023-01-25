using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Recepti.Data;
using Recepti.Helper;
using Recepti.Modul1.Models;
using Recepti.Modul1.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Recepti.Modul1.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class ThemeController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ThemeController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public Themes Get(int id)
        {
            return _dbContext.Theme.Find(id);
        }

        [HttpPost]
        public Themes Add([FromBody] ThemeAddVM x)
        {
            var newThemes = new Themes
            {
                naziv = x.naziv,
                opis = x.opis.RemoveTags(),
                created_time = DateTime.Now
            };

            _dbContext.Add(newThemes);
            _dbContext.SaveChanges();
            return newThemes;
        }
     

        [HttpPost("{id}")]
        public ActionResult Update(int id, [FromBody] ThemeUpdateVM x)
        {
            Themes themes = _dbContext.Theme.Find(id);

            if (themes == null)
                return BadRequest("pogresan ID");

            themes.naziv = x.naziv.RemoveTags();
            themes.opis= x.opis;
           

            _dbContext.SaveChanges();
            return Ok(themes);
        }

        [HttpPost("{id}")]
        public ActionResult Delete(int id)
        {
            if (_dbContext.Theme.Count() < 10)
                return BadRequest("Ne moze se obrisati ako je broj zapisa manji od 100");
          
            Themes theme = _dbContext.Theme.Find(id);
            
            if (theme == null || id == 1 )
                return BadRequest("Pogresan ID");

            _dbContext.Remove(theme);

            _dbContext.SaveChanges();
            return Ok(theme);
        }
       
        [HttpGet]
        

        [HttpGet]
        public List<ThemeGetAllVM> GetAll(string name)
        {
            var data = _dbContext.Theme.Where(x => name == null || x.naziv.StartsWith(name)).OrderByDescending(s => s.id)
                .Select(s => new ThemeGetAllVM
                {
                    id = s.id,
                    naziv = s.naziv,
                    opis = s.opis,
                    
                    created_time = s.created_time,
                   
                   

                })
                .AsQueryable();
            return data.Take(100).ToList();
        }


    }
}
