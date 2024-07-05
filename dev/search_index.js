var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = SpeciesDistributionModels","category":"page"},{"location":"#SpeciesDistributionModels","page":"Home","title":"SpeciesDistributionModels","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for SpeciesDistributionModels.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [SpeciesDistributionModels]","category":"page"},{"location":"#SpeciesDistributionModels.ShapleyValues","page":"Home","title":"SpeciesDistributionModels.ShapleyValues","text":"ShapleyValues(algorithm::Shapley.Algorithm)\nShapleyValues(N::Integer; threaded = true, rng = Random.GLOBAL_RNG)\n\nUse to specify use Shapley values as method in explain. If an integer N, and optionally threaded and rng is supplied, MonteCarlo sampling is used, where N is the number of iterations (samples). More samples will result in more accurate results,  but will take more time to compute.\n\n\n\n\n\n","category":"type"},{"location":"#SpeciesDistributionModels.evaluate-Tuple{Any}","page":"Home","title":"SpeciesDistributionModels.evaluate","text":"evaluate(x; measures, train = true, test = true, [validation])\n\nEvaluate x, which could be a SDMmachine, SDMgroup, or SDMensemble,  by applying the measures provided to the data used to built an ensemble,  and return an evaluation object.\n\nKeywords\n\nmeasures is a NamedTuple of measures. The keys are used to identify the measures.\n\nThis defaults to using auc, logloss, and kappa. For threshold-dependent measures, the highest score as well as the threshold at which the highest scores is reached are reported. A list of measurse is available here: https://juliaai.github.io/StatisticalMeasures.jl/dev/autogeneratedlistof_measures/#aliases. However, note that not all measures are useful.\n\ntrain: a Bool that indicates whether to evaluate on the training data. Defaults to true\ntest: a Bool that indicates whether to evaluate on the test data.Defaults to true\nvalidation: optionally, provide a separate validation dataset. \n\nData should be provided as a Tuple with presences as the first field and absences as the second.\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.explain-Tuple{SDMensemble}","page":"Home","title":"SpeciesDistributionModels.explain","text":"explain(ensemble::SDMensemble; method, [data], [predictors])\n\nGenerate response curves for ensemble.\n\nKeywords\n\nmethod is the algorithm to use. See ShapleyValues\ndata is the data to use to generate response curves, and defaults to the data used to train the ensemble\npredictors: which predictors to generate response curves for. Defaults to all variables in data.\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.machine_evaluations","page":"Home","title":"SpeciesDistributionModels.machine_evaluations","text":"machine_evaluations(eval)\n\nGet the scores for each machine in an evaluation, which can be either an \n`SDMgroupEvaluation` or an `SDMensembleEvaluation`.\n\nThe return type is a nested structure of `NamedTuple`s. \nThe `NamedTuple` returned has keys corresponding to the evaluation datasets (a subset of :train, :test, and :validation), \nwhich each have keys corresponding to the measures specified in [`evaluate`](@ref).\n\n## Example\n```julia\nevaluation = SDM.evaluate(ensemble; measures = (; accuracy, auc))\nmachine_aucs = SDM.machine_evaluations(evaluation).train.auc\n```\n\n\n\n\n\n","category":"function"},{"location":"#SpeciesDistributionModels.predict-Tuple{SpeciesDistributionModels.SDMmachine, Any}","page":"Home","title":"SpeciesDistributionModels.predict","text":"predict(SDMobject, newdata; clamp = false, threaded = false, [reducer], [by_group])\n\nUse an SDMmachine, SDMgroup, or SDMensemble to predict habitat suitability for some data, optionally summarized for the entire ensemble, or for each SDMgroup.\n\nnewdata can be either a RasterStack, or a Tables.jl.compatible object. It must have all predictor variables used to train the models in its columns (or layers in case of a RasterStack).\n\nKeywords\n\nclamp: if true, the predictions are clamped to the interval seen during training of SDMobject. Defaults to false\nthreaded: if true, run multithreaded. Defaults to true.\nreducer: Optionally provide a Function to summarize the output. The function should take an vector of values and return a single value. Typical examples are Statistics.mean or Statistics.median.\nby_group is set to true, the data is reduced for each SDMgroup, if it is set to false (the default), it reduced across the entire ensemble.\n\nReturns\n\nIf newdata is a RasterStack, the predict returns a Raster; otherwise, it returns a NamedTuple of Vectors, with  habitat suitability represented by a floating-point number between 0 and 1.\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.remove_collinear-Tuple{Any}","page":"Home","title":"SpeciesDistributionModels.remove_collinear","text":"remove_collinear(data; method, silent = false)\n\nRemoves strongly correlated variables in data, until correlation is below a threshold specified in method.\n\nmethod can currently be either Gvif, Vif or Pearson, which use GVIF, VIF, or Pearson's r, respectively. GVIF and VIF are similar method, but GVIF includes categorical variables whereas VIF ignores them.\n\nTo run without showing information about collinearity scores, set silent = true.\n\nExample\n\njulia> import SpeciesDistributionModels as SDM\njulia> mydata = (a = 1:100, b = sqrt.(1:100), c = rand(100))\njulia> SDM.remove_collinear(mydata; method = SDM.Vif(10))\n[ Info: a has highest GVIF of 28.367942095054225\n[ Info: Removing a, 2 variables remaining\n[ Info: b has highest GVIF of 1.0077618445543057\n[ Info: All variables are below threshold, returning remaining variables\n(:b, :c)\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.sdm-Tuple{Any, Any}","page":"Home","title":"SpeciesDistributionModels.sdm","text":"sdm(data, models; [resampler], [predictors], [verbosity])\n\nConstruct an ensemble.\n\nArguments\n\ndata: an SDMdata object models: a NamedTuple with the models to be used in the ensemble.\n\nKeywords\n\nmodels: a Vector of the models to be used in the ensemble. All models must be MLJ-supported Classifiers. \nFor a full list of supported models, see https://alan-turing-institute.github.io/MLJ.jl/stable/model_browser/#Classification\npredictors: a Vector of Symbols with the names of the predictor values to be used. By default, all pdf\nverbosity: an Int value that regulates how much information is printed.\ncache: is passed to MLJBase.machine. Specify cache=false to prioritize memory management over speed.\nscitype_check_level: is passed to MLJBase.machine. Specify scitypechecklevel=0 to disable scitype checking.\n\nExample\n\nusing SpeciesDistributionModels, Maxnet, MLJGLMInterface\nmydata = sdmdata(presences, absences; resampler = CV(nfolds = 5))\nmodels = (maxnet = MaxnetBinaryClassifier(), glm = LinearBinaryClassifier())\nensemble = sdm(mydata, models)\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.sdmdata-Tuple{Any, Any}","page":"Home","title":"SpeciesDistributionModels.sdmdata","text":"sdmdata(presences, absences; resampler, predictors)\nsdmdata(X, y::BitVector; resampler, predictors)\n\nConstruct an SDMdata object from species presences and absences.  Alternatively, from a table with predictor variables X and a BitVector y, where false represents absence and true represents presence.\n\nKeywords\n\nresampler: The resampling strategy to be used. Should be a MLJBase.ResamplingStrategy, or a Vector of Tuples with the form (train, test).    Defaults to NoResampling(). If resampler is a CV, shuffle is internally set to true.\npredictors: a Tuple of Symbols with the names of the predictor values to be used. By default, all predictor variables in X,  or all predictor variables in both presences and absences are used..\n\nReturns\n\nAn SDMdata object containing the data provided. This object can be used to construct an SDMensemble.\n\nExample\n\nusing Rasters, SpeciesDistributionModels\nA = rand(10,10)\nB = rand(10,10)\nst = RasterStack((a=A, b=B), (X, Y); missingval=(a=missing,b=missing))\n\npresence_points = [(1, 1), (2, 2), (3, 3), (4, 4)]\nabsence_points = [(5, 5), (6, 6), (7, 7), (8, 8)]\n\np = extract(st, presence_points)\na = extract(st, absence_points)\n\nmydata = sdmdata(p, a; resampler = CV(nfolds = 2)) # 2-fold cross validation\nmydata2 = sdmdata([p; a], [trues(4); falses(4)]; resampler = [([1,2],[5,6]), ([3,4], [7,8])]) # provide resampling rows\n\n\n\n\n\n","category":"method"},{"location":"#SpeciesDistributionModels.thin-Tuple{Any, Any}","page":"Home","title":"SpeciesDistributionModels.thin","text":"thin(x, cutoff; distance = Haversine(), [rng])\n\nThin spatial data by removing points that are closer than `cutoff` distance\nto the nearest other point in the dataset.\n\n## Arguments\n- `x`: an `AbstractVector` that iterates points, or a table with a `:geometry` column.\n- `cutoff`: the distance threshold in units of `distance`.\n## Keywords\n- `distance`: the distance metric used to calculate distances between points. The default\nis `Haversine()`, which uses the Haversine formula to calculate the distance between coordinates in meter units.\n- `rng`: a random number generator. The default is `Random.GLOBAL_RNG()`.\n\n## Example\n```jldoctest\nusing SpeciesDistributionModels, Distances\n# a vector that iteratores points\ngeometries = [(0,0), (1,0), (0,0.000001)]\n# thin to 1000 meters\nthin(geometries, 1000)\n# thin to 1 degree\nthin(geometries, 1; distance = Euclidean(), rng = Xoshiro(123))\n\n# output\n2-element Vector{Tuple{Int64, Real}}:\n(0, 0)\n(1, 0)\n```\n\n\n\n\n\n","category":"method"}]
}
