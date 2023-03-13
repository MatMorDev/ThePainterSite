package school.digitazon.thePainter.controller;

import jakarta.validation.Valid;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import school.digitazon.thePainter.entity.Article;
import school.digitazon.thePainter.repository.ArticleRepository;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    ArticleRepository articleRepository;

    // http://localhost:8080/articles/get
    // http://localhost:8080/articles/get?title=&description=
    /* GET all endpoint per poter vedere tutti gli article
    e poterli anche cercare tramite titolo o descrizione */
    @GetMapping("/get")
    public List<Article> getAll(
            @RequestParam(name = "title", required = false) String titleParam,
            @RequestParam(name = "description", required = false) String descriptionParam)
    {
        if(Strings.isNotBlank(titleParam) && Strings.isNotBlank(descriptionParam)){
            // caso in cui title e description sono entrambi valorizzati
            return articleRepository.findByTitleContainsIgnoreCaseAndDescriptionContainsIgnoreCase(titleParam,descriptionParam);
        }else if(Strings.isNotBlank(titleParam)){
            // caso in cui solo il title è valorizzato
            return articleRepository.findByTitleContainsIgnoreCase(titleParam);
        }else if(Strings.isNotBlank(descriptionParam)){
            // caso in cui solo il description è valorizzato
            return articleRepository.findByDescriptionContainsIgnoreCase(descriptionParam);
        }
        // ritorno la lista non filtrata se nessuno dei due è valorizzato ed il risultato è presente
        return articleRepository.findAll();
    }

    // http://localhost:8080/articles/get/3
    /* GET by id endpoint per prendere un article per il suo id */
    @GetMapping("/get/{id}")
    public Article getById(@PathVariable Integer id) {
        Optional<Article> result = articleRepository.findById(id);
        if(result.isPresent()){
            // restituisce l'article con l'id che viene passato
            return result.get();
        } else {
            // se non trova l'article con l'id passato ritorna HTTP 404 non trovato
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article with id " + id + " not found");
        }
    }

    // http://localhost:8080/articles/category/get?category
    /* GET by category endpoint per prendere un article per la sua categoria */
    @GetMapping("/category/get")
    public List<Article> getByCategory(@RequestParam(name = "category", required = false) String category) {
        if(Strings.isNotBlank(category)){
            // category è valorizzato
            return articleRepository.findByCategoryContainsIgnoreCase(category);
        }
        return articleRepository.findAll();
    }

    // http://localhost:8080/articles/admin/post
    /* POST endpoint per creare un nuovo article */
    @PostMapping("/admin/post")
    public Article create(@Valid @RequestBody Article newArticle) {
        newArticle.setId(0);// mi assicuro che il nuovo article abbia un id vuoto
        return articleRepository.save(newArticle); // permango il article sul DB
    }

    // http://localhost:8080/articles/admin/put/2
    /* PUT endpoint per modificare un article */
    @PutMapping("/admin/put/{id}")
    public Article update(@PathVariable Integer id, @Valid @RequestBody Article article) {
        Optional<Article> result = articleRepository.findById(id);
        if (result.isPresent()) {
            // restituisco l'article modificato
            Article articleToUpdate = result.get();
            articleToUpdate.setTitle(article.getTitle());
            articleToUpdate.setDescription(article.getDescription());
            articleToUpdate.setCategory(article.getCategory());
            articleToUpdate.setDate(article.getDate());
            // modifico l'article sul database
            return articleRepository.save(articleToUpdate);
        } else {
            // se non trovo l'article con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article with id " + id + " not found");
        }
    }

    // http://localhost:8080/articles/admin/delete/5
    // DELETE endpoint per eliminare un singolo article
    // elimina l'articolo e tutti i suoi commenti se presenti con cascade
    @DeleteMapping("/admin/delete/{id}")
    public void delete(@PathVariable Integer id) {
        Optional<Article> articleResult = articleRepository.findById(id);
        if (articleResult.isPresent()) {
            // elimino l'article preso per id
            articleRepository.deleteById(id);
        } else {
            // se non trovo l'article con quell'id sollevo un'eccezione che ritorna HTTP 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article with id " + id + " not found");
        }
    }
}
